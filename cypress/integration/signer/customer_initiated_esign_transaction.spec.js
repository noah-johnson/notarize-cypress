/// <reference types="Cypress" />
const signer = require("../../assets/data").signer;

describe("customer_initiated_esign_transaction", () => {
  it("allows a signer to upload and esign a document", () => {
    signUp(signer);
    upload("test_doc_1.pdf");
    sign();
    viewDocument();
    cy.contains("Completed").should("exist");
  });

  const signUp = (signer) => {
    cy.open("app", "signup");
    cy.get('[data-automation-id="first-name-field"]').type(signer.firstName);
    cy.get('[data-automation-id="last-name-field"]').type(signer.lastName);
    cy.get('[data-automation-id="email-field"]').type(signer.email);
    cy.get('[data-automation-id="password-field"]').type(signer.password);
    cy.get('[data-automation-id="create-account-button"]').click();
  }

  const upload = (file) => {
    cy.get('[data-automation-id="portal-switcher-sign"]').click();
    cy.get('[data-automation-id="start-an-esign-transaction"]').click()
    cy.get('[data-automation-id="multi-uploader-dropzone"]')
      .attachFile(file, { subjectType: 'drag-n-drop' });
    cy.get('[data-automation-id="continue-to-document-button"]').click();
  }

  const sign = () => {
    cy.get('[data-automation-id="confirm-signer"]').click();
    cy.get('[data-automation-id="tool-annotation-signature"]').click();
    cy.get('[data-automation-id="page-0"]').click(100,100);
    cy.get('[data-automation-id="Create text-based signature"]').click();
    cy.get('[data-automation-id="BiroScript"]').click();
    cy.get('.signature-checkbox-label').click();
    cy.get('[data-automation-id="create-and-apply"]').click();
    cy.get('[data-automation-id="tool-annotation-date"]').click();
    cy.get('[data-automation-id="page-0"]').click(200,200);
    cy.get('[data-automation-id="pdf-menu-button"]').click();
  }

  const viewDocument = () => {
    cy.contains("View Documents").click();
    cy.get('[data-automation-id="home-button"]').click();
    cy.get('[data-automation-id="document-bundle-action"]').first().click();
  }
});