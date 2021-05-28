export const state = () => ({
  accessToken: null,
  idToken: null,
  expiresAt: null,
  modal: null,
})

export const mutations = {
  OPEN_MODAL(state, modal) {
    state.modal = modal
  },
  CLOSE_MODAL(state) {
    state.modal = null
  },
  SET_USER_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken
  },
  SET_USER_ID_TOKEN(state, idToken) {
    state.idToken = idToken
  },
  SET_USER_EXPIRESAT(state, expiresAt) {
    state.expiresAt = expiresAt
  },
}
