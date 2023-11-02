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
});
