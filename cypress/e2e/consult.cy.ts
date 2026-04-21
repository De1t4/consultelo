describe("Consult Page E2E (Consultelo)", () => {
  beforeEach(() => {
    cy.login("test@example.com", "testtest");
    cy.wait(3000);
    cy.visit("/consultation");
  });

  it("should load the consult page and display the consult form", () => {
    cy.contains("Create Consultation").should("be.visible");
    cy.contains("Drafting").should("be.visible");
    cy.contains("Review").should("be.visible");
  });
});

describe("Consult Form E2E (Consultelo)", () => {
  beforeEach(() => {
    cy.login("test@example.com", "testtest");
    cy.wait(3000);
    cy.visit("/consultation");
  });

  it("should display error messages when the consult form is submitted with empty fields", () => {
    cy.get("button[id='continue-btn']").click();
    cy.get("p[id='title-error']").should("be.visible");
    cy.get("p[id='body-error']").should("be.visible");
    cy.get("p[id='category-error']").should("be.visible");
  });

  it("should display the review form with valid data", () => {
    cy.get("input[id='title']").type("Test Consultation");
    cy.get("div[id='body']").type("Test Description");
    cy.get("select[id='categories']").select("Software");
    cy.get("button[id='continue-btn']").click();
    cy.get("h2[id='title-review']").should("have.text", "Test Consultation");
    cy.get("div[id='body-review']").should("have.text", "Test Description");
    cy.get("div[id='categories-review']").should("have.text", "Software");
  });
});
