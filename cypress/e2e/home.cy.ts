describe("Landing Page E2E (Consultelo)", () => {
  it("should load the home page and display the contact form", () => {
    // Cypress visit reference baseUrl configurada en cypress.config.ts (http://localhost:3000)
    cy.visit("/");

    // Verificamos elementos críticos que creamos en los tests anteriores
    cy.contains("Full Name").should("be.visible");
    cy.contains("Professional Email").should("be.visible");

    // Verificamos que el botón de enviar mensaje esté visible
    cy.contains("Send Message").should("be.visible");
  });

  it("should display the correct title", () => {
    cy.visit("/");
    cy.title().should("eq", "Consultelo");
  });
});

describe("Contact Form E2E (Consultelo)", () => {
  it("should display error messages when the contact form is submitted with empty fields", () => {
    cy.visit("/");
    cy.get("button[type='submit']").click();
    cy.get("[data-testid='error-fullname']").should("be.visible");
    cy.get("[data-testid='error-email']").should("be.visible");
    cy.get("[data-testid='error-subject']").should("be.visible");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("should fill the contact form and submit it", () => {
    cy.visit("/");
    cy.get("button[type='submit']").click();
    cy.get("[id='fullname']").type("John Doe");
    cy.get("[id='email']").type("john@company.com");
    cy.get("[id='subject']").select("General Inquiry");
    cy.get("[id='message']").type("How can we help you?");
    cy.get("button[type='submit']").click();
    cy.get("[data-testid='submit-status']").should("be.visible");
    cy.get("[data-testid='submit-status']").should(
      "contain",
      "Message sent successfully! We will get back to you soon.",
    );
  });
});
