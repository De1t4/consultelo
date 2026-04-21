// <reference types="cypress" />

import SidebarSelector from "./selectors/SidebarViewSelector";

describe("Login Page E2E (Consultelo)", () => {
  it("should load the login page and display the login form", () => {
    cy.visit("/account?auth=login");

    cy.contains("Email").should("be.visible");
    cy.contains("Password").should("be.visible");

    cy.contains("Sign In").should("be.visible");
  });

  it("should login with invalid credentials", () => {
    cy.visit("/account?auth=login");
    cy.login("example@gmail.com", "invalidPassword123");
    cy.contains("User or password incorrect. Please try again.").should(
      "be.visible",
    );
    cy.url().should("include", "/account?auth=login");
  });

  it("should login with valid credentials and logout", () => {
    cy.visit("/account?auth=login");
    cy.login("test@example.com", "testtest");
    cy.wait(3000);
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard Overview").should("be.visible");
    cy.get(SidebarSelector.sidebarSelector.sidebar).trigger("mouseover");
    cy.wait(1000);
    cy.get(SidebarSelector.sidebarSelector.btn_logout).click();
    cy.url().should("include", "/account?auth=login");
  });

  it("should login with valid credentials and logout mobile", () => {
    cy.viewport("iphone-x");
    cy.login("test@example.com", "testtest");
    cy.wait(3000);
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard Overview").should("be.visible");
    cy.get(SidebarSelector.sidebarSelector.btn_more_mobile).click();
    cy.wait(1000);
    cy.get(SidebarSelector.sidebarSelector.btn_logout_mobile).click();
    cy.url().should("include", "/account?auth=login");
    cy.contains("Sign In").should("be.visible");
  });
});
