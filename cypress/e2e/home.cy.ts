import FormContactSelector from "./selectors/FormContactSelector";

describe("Landing Page E2E (Consultelo)", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should load the home page and display the contact form", () => {
    cy.contains("Full Name").should("be.visible");
    cy.contains("Professional Email").should("be.visible");
    cy.contains("Send Message").should("be.visible");
  });

  it("should display the correct title", () => {
    cy.title().should("eq", "Consultelo");
  });
});

describe("Contact Form E2E (Consultelo)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(FormContactSelector.formContactSelector.btn_submit).click();
  });

  it("should display error messages when the contact form is submitted with empty fields", () => {
    cy.get(FormContactSelector.formContactSelector.msg_error_fullname).should(
      "be.visible",
    );
    cy.get(FormContactSelector.formContactSelector.msg_error_email).should(
      "be.visible",
    );
    cy.get(FormContactSelector.formContactSelector.msg_error_subject).should(
      "be.visible",
    );
    cy.get(FormContactSelector.formContactSelector.msg_error_message).should(
      "be.visible",
    );
  });

  it.skip("should fill the contact form and submit it", () => {
    cy.get(FormContactSelector.formContactSelector.input_fullname).type(
      "John Doe",
    );
    cy.get(FormContactSelector.formContactSelector.input_email).type(
      "john@company.com",
    );
    cy.get(FormContactSelector.formContactSelector.input_subject).select(
      "General Inquiry",
    );
    cy.get(FormContactSelector.formContactSelector.input_message).type(
      "How can we help you?",
    );
    cy.get(FormContactSelector.formContactSelector.btn_submit).click();
    cy.get(FormContactSelector.formContactSelector.msg_success).should(
      "be.visible",
    );
    cy.get(FormContactSelector.formContactSelector.msg_error_email).should(
      "be.visible",
    );
  });

  it("should fill the contact form with invalid email and display error message", () => {
    cy.get(FormContactSelector.formContactSelector.input_fullname).type(
      "John Doe",
    );
    cy.get(FormContactSelector.formContactSelector.input_email).type(
      "invalid-email",
    );
    cy.get(FormContactSelector.formContactSelector.input_subject).select(
      "General Inquiry",
    );
    cy.get(FormContactSelector.formContactSelector.input_message).type(
      "How can we help you?",
    );
    cy.get(FormContactSelector.formContactSelector.btn_submit).click();
    cy.get(FormContactSelector.formContactSelector.msg_error_email).should(
      "be.visible",
    );
  });
});

describe("Header E2E (Consultelo)", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the home page and display the header", () => {
    cy.get("header").should("be.visible");
    cy.get("header").contains("Sign In").should("be.visible");
    cy.get("header").contains("Register").should("be.visible");
  });

  it("user should be able to login and see dashboard button", () => {
    cy.login("test@example.com", "testtest");
    cy.wait(3000);
    cy.visit("/");
    cy.get("#btn-dashboard").contains("Dashboard").should("be.visible");
  });
});
