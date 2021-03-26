export const state = () => ({
  gameState: null,
  serverState: {},
})

export const mutations = {
  SET_GAME_STATE(state, gameState) {
    state.gameState = gameState
  },
  SET_SERVER_STATE(state, serverState) {
    state.serverState = serverState
  },
}
