describe('PlayerMenu', () => {
  it('should be able to add a new player', () => {
    cy.visit('http://localhost:6006/iframe.html?id=playermenu--default')
    cy.get(`[data-test=player-menu__row]`).should('have.length', 1)
    cy.get('[data-test=player-menu__add-row]').click()
    cy.get(`[data-test=player-menu__row]`).should('have.length', 2)
  })
})
