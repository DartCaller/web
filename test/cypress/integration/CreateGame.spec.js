const mockWebSocket = { send: (data) => ({}) }
describe('CreateGame', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=gamecreation-creategame--default'
    )
    cy.spy(mockWebSocket, 'send')
    cy.window().then((win) => {
      win.mockWebSocketSend = mockWebSocket.send
    })
  })

  it('should be able to create a 501 game', () => {
    cy.addRowAndTypePlayerName('Alice', { addRow: false })
    cy.addRowAndTypePlayerName('Bob')
    cy.getByData('create-game__submit').click()
    cy.wrap({}).should(() => {
      expect(mockWebSocket.send).to.be.calledWithExactly(
        '{"type":"CreateGame","players":["Alice","Bob"],"gameMode":501}'
      )
    })
  })

  it('should be able to create a 301 game', () => {
    cy.addRowAndTypePlayerName('Alice', { addRow: false })
    cy.addRowAndTypePlayerName('Bob')
    cy.addRowAndTypePlayerName('Clemens')
    cy.getByData('create-game__game-mode').vsSelect(
      'create-game__game-mode__option_301'
    )
    cy.getByData('create-game__submit').click()
    cy.wrap({}).should(() => {
      expect(mockWebSocket.send).to.be.calledWithExactly(
        '{"type":"CreateGame","players":["Alice","Bob","Clemens"],"gameMode":301}'
      )
    })
  })
})
