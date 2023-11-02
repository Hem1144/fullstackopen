describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Super User",
      username: "root",
      password: "root",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Show Login").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Show Login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("root");
      cy.contains("login").click();
      cy.contains("Super User logged in");
      cy.get(".notify").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notify").should("have.css", "border-style", "solid");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Show Login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("wrong-password");
      cy.contains("login").click();
      cy.contains("wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.supportLogin({ username: "root", password: "root" });
    });

    const createBlog = function () {
      cy.contains("Show Blog Form").click();
      cy.get("#title").type("Title added by cypress test");
      cy.get("#author").type("Cypress In-built Tester");
      cy.get("#url").type("https://testingurl.com.np");
      cy.get("#submit-btn").click();
      cy.contains("Title added by cypress test");
      cy.contains("Cypress In-built Tester");
      cy.get(".notify").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notify").should("have.css", "border-style", "solid");
    };

    it("A blog can be created", function () {
      cy.contains("Show Blog Form").click();
      cy.get("#title").type("Title added by cypress test");
      cy.get("#author").type("Cypress In-built Tester");
      cy.get("#url").type("https://testingurl.com.np");
      cy.get("#submit-btn").click();
      cy.contains("Title added by cypress test");
      cy.contains("Cypress In-built Tester");
      cy.get(".notify").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notify").should("have.css", "border-style", "solid");
    });

    it("User can Like a blog", function () {
      const newBlog = {
        title: "New Blog",
        author: "Cypress tester",
        url: "www.example.com",
      };
      cy.supportCreateBlog(newBlog);
      cy.contains("show").click();
      cy.contains("0");
      cy.get("#like-blog").click();
      cy.contains("1");
    });

    it("User can delete a blog", function () {
      const newBlog = {
        title: "Title added by cypress test",
        author: "Cypress In-built Tester",
        url: "www.example.com",
      };
      cy.supportCreateBlog(newBlog);
      cy.contains("show").click();
      cy.get("#remove-blog").click();
      cy.contains(
        ".notify",
        'A blog, "Title added by cypress test" by Cypress In-built Tester is deleted!!!',
        { matchCase: false }
      );
      cy.get(".notify").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notify").should("have.css", "border-style", "solid");
    });

    it("Only creater of blog can see remove button", function () {
      const newBlog = {
        title: "Title added by cypress test",
        author: "Cypress In-built Tester",
        url: "www.example.com",
      };
      cy.supportCreateBlog(newBlog);
      cy.contains("Log out").click();
      const user = {
        name: "Administrator",
        username: "admin",
        password: "admin",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
      cy.supportLogin(user);
      cy.contains("show").click();
      cy.get("#remove-blog").should("not.exist");
    });

    describe("add a few more blogs", function () {
      beforeEach(function () {
        const blog1 = {
          title: "Testing Title1",
          author: "hemdulal",
          url: "http://example.com",
        };
        const blog2 = {
          title: "Testing Title2",
          author: "hemdulal",
          url: "http://example.com",
        };
        const blog3 = {
          title: "Testing Title3",
          author: "hemdulal",
          url: "http://example.com",
        };
        cy.supportCreateBlog(blog1);
        cy.supportCreateBlog(blog2);
        cy.supportCreateBlog(blog3);
      });

      it("and the first blog has maximum likes", function () {
        cy.get(".show-btn").eq(0).click();
        cy.get(".show-btn").eq(0).click();
        cy.get(".show-btn").eq(0).click();
        cy.get(".like-btn").eq(0).click().click();
        cy.get(".like-btn").eq(2).click().click().click();
        cy.get(".blog-div").eq(0).should("contain", "Testing Title1");
      });
    });
  });
});
