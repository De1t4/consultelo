describe("Login Page E2E (Consultelo)", () => {
  it("should load the login page and display the login form", () => {
    cy.visit("/account?auth=login");

    cy.contains("Email").should("be.visible");
    cy.contains("Password").should("be.visible");

    cy.contains("Sign In").should("be.visible");
  });

  it("should login with invalid credentials", () => {
    cy.visit("/account?auth=login");
    cy.get("input[type='email']").type("example@gmail.com");
    cy.get("input[type='password']").type("invalidPassword123");
    cy.get("button[type='submit']").click();
    cy.contains("User or password incorrect. Please try again.").should(
      "be.visible",
    );
    cy.url().should("include", "/account?auth=login");
  });

  it("should login with valid credentials and logout", () => {
    cy.visit("/account?auth=login");
    cy.get("input[type='email']").type("test@example.com");
    cy.get("input[type='password']").type("testtest");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard Overview").should("be.visible");
    cy.get("aside[id='sidebar']").trigger("mouseover");
    cy.wait(1000);
    cy.get("button[id='logout-button']").click();
    cy.url().should("include", "/account?auth=login");
  });
});
