describe('PlayerMenu', () => {
  it('should be able to add, name & remove a new player', () => {
    cy.visit('http://localhost:6006/iframe.html?id=playermenu--default')
    cy.getByData('player-menu__row').should('have.length', 1)
    cy.getByData('player-menu__add-row').click()
    cy.getByData('player-menu__row').should('have.length', 2)
    cy.getByData('player-row__input').first().type('Alice')
    cy.getByData('player-row__delete').last().click()
    cy.getByData('player-menu__row').should('have.length', 1)
    cy.getByData('player-row__display').should('contain', 'Alice')
  })
})
