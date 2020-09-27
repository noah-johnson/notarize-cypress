/// <reference types="Cypress" />
const signer = require("../assets/data").signer;

describe("customer_initiated_esign_transaction", () => {
  it("allows a signer to upload and esign a document", () => {
    const testFile = "../assets/test_doc_1.pdf";

    cy.open("app", "login");
    cy.login(signer.email, signer.password);

    upload(testFile);
    sign();
    viewDocument();

    cy.contains("Completed").should("exist");
  });

  const upload = (filePath) => {
    cy.get('[data-automation-id="upload-document-button"]').click();
    cy.get('[data-automation-id="signer-dashboard-action-esign"]').click();
    cy.get('[data-automation-id="multi-uploader-dropzone"]').attachFile(filePath, { subjectType: 'drag-n-drop' });
    cy.get('[data-automation-id="continue-to-document-button"]').click();
  }

  const sign = () => {
    cy.get('[data-automation-id="confirm-signer"]').click();
    cy.get('[data-automation-id="tool-annotation-signature"]').click();
    cy.get('[data-automation-id="page-0"]').click();
    cy.get('[data-automation-id="Create text-based signature"]').click();
    cy.get('[data-automation-id="BiroScript"]').click();
    cy.get('.signature-checkbox-label').click();
    cy.get('[data-automation-id="create-and-apply"]').click();
    cy.get('[data-automation-id="pdf-menu-button"]').click();
  }

  const viewDocument = () => {
    cy.contains("View Documents").click();
    cy.get('[data-automation-id="home-button"]').click();
    cy.get('[data-automation-id="document-bundle-action"]').first().click();
  }
});