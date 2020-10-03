/// <reference types="Cypress" />
const signer = require("../../assets/data").signer;

describe("customer_initiated_transaction", () => {
  it("allows a signer to upload a document, complete KBA, and enter the queue", () => {
    signUp(signer);
    upload("test_doc_1.pdf");
    completeTechCheck();
    completeKBA(signer);
    completeIDCapture();
    cy.get('[data-automation-id="lets-get-started-button"]').should('exist');
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
    cy.get('[data-automation-id="start-a-standard-transaction"]').click();
    cy.get('[data-automation-id="multi-uploader-dropzone"]')
      .attachFile(file, { subjectType: 'drag-n-drop' });
    cy.get('[data-automation-id="continue-to-document-button"]').click();
    cy.get('[data-automation-id="confirm-signer"]').click();
    cy.get('[data-automation-id="cosigner-not-required"]').click();
    cy.get('[data-automation-id="pdf-menu-button"]').click();
  }

  const completeTechCheck = () => {
    cy.get('[data-automation-id="tech-check-continue-button"]').click();
    cy.url().then(url => {
      if (!url.includes("twilio")) {
        cy.get('[data-automation-id="confirm-video-settings-button"]').click();
      }
    });
    cy.get('[data-automation-id="select-audioinput"]').click();
    cy.get('[data-automation-id="select-audioinput"]')
      .contains("Fake Audio Input 1")
      .click();
    cy.get('[data-automation-id="select-audiooutput"]').click();
    cy.get('[data-automation-id="select-audiooutput"]')
      .contains("Fake Audio Output 1")
      .click();
    cy.get('[data-automation-id="confirm-audio-settings-button"]').click();
  }

  const completeKBA = (signer) => {
    cy.get('[data-automation-id="birth-month-field"]').click();
    cy.contains(signer.birthMonth).click();
    cy.get('[data-automation-id="birth-day-field"]').type(signer.birthDay);
    cy.get('[data-automation-id="birth-year-field"]').type(signer.birthYear);
    cy.get('[data-automation-id="ssn-field"]').type(signer.lastSSN);
    cy.get('[data-automation-id="line1-field"]').type("745");
    cy.contains("745 Boylston Street").click();
    cy.get('[data-automation-id="ssn-save-button"]').click();
    cy.get('[data-automation-id="quiz-get-started-button"]').click();
    cy.get('span:contains(CORRECT)').click({ multiple: true });
    cy.get('[data-automation-id="quiz-submit-button"]').click();
    cy.get('[data-automation-id="quiz-success"]').click();
  }

  const completeIDCapture = () => {
    cy.get('[data-automation-id="answer-DRIVER_LICENSE"]').click();
    // primary
    cy.get('[data-automation-id="identification-check-take-photo"]').click();
    cy.get('.IdentificationCapture--webcam--grid').click();
    cy.get('[data-automation-id="identification-check-confirm-and-continue"]').click();
    // secondary
    cy.get('[data-automation-id="identification-check-take-photo"]').click();
    cy.get('.IdentificationCapture--webcam--grid').click();
    cy.get('[data-automation-id="identification-check-confirm-and-continue"]').click();
    cy.get('[data-automation-id="identification-check-form-submit"]').click();
    cy.get('[data-automation-id="identification-check-secondary-skip"]').click();
  }
});