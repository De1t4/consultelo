/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import FormLoginSelector from "../e2e/selectors/FormLoginSelector";

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/account?auth=login");
  cy.get(FormLoginSelector.formLoginSelector.input_email).type(email);
  cy.get(FormLoginSelector.formLoginSelector.input_password).type(password);
  cy.get(FormLoginSelector.formLoginSelector.btn_submit).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
    }
  }
}
