import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('open', (portal, path, options) => {
  const environment = Cypress.env('environment');
  return cy.visit(`${portal}.${environment}.notarize.com/${path}`, options);
});

Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-automation-id="email-field"]').type(email);
  cy.get('[data-automation-id="password-field"]').type(password);
  cy.get('[data-automation-id="sign-in-button"]').click();
});
