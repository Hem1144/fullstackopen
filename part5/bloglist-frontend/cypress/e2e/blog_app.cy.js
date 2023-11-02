describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Cypress Tester",
      username: "cypress",
      password: "admin",
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
      cy.get("#username").type("cypress");
      cy.get("#password").type("admin");
      cy.contains("login").click();
      cy.contains("Cypress Tester logged in");
      cy.get(".notify").should("have.css", "color", "rgb(0, 128, 0)");
      cy.get(".notify").should("have.css", "border-style", "solid");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Show Login").click();
      cy.get("#username").type("cypress");
      cy.get("#password").type("wrong-password");
      cy.contains("login").click();
      cy.contains("wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("Show Login").click();
      cy.get("#username").type("cypress");
      cy.get("#password").type("admin");
      cy.contains("login").click();
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

    it("A blog can be created", createBlog);

    it("User can Like a blog", function () {
      createBlog();
      cy.contains("show").click();
      cy.contains("0");
      cy.get("#like-blog").click();
      cy.contains("1");
    });
  });
});
