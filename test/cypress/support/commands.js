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

Cypress.Commands.add(
  'addRowAndTypePlayerName',
  (name, { addRow = true } = {}) => {
    if (addRow) cy.getByData('player-menu__add-row').click()
    cy.getByData('player-row__input')
      .last()
      .type(name + '{enter}')
  }
)

// Special Util function to select values from Vuesax dropdown menus
Cypress.Commands.add(
  'vsSelect',
  { prevSubject: 'element' },
  (subject, optionSelector) => {
    cy.wrap(subject).click()
    cy.getByData(optionSelector, { extraSelector: ':visible' }).click()
  }
)
