// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getByData', (dataSelector, options = {}) => {
  const extraSelector = options.extraSelector ? options.extraSelector : ''
  cy.get(`[data-test=${dataSelector}]${extraSelector}`, options)
})
