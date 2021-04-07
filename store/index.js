export const state = () => ({
  modal: 'CorrectScore',
})

export const mutations = {
  OPEN_MODAL(state, modal) {
    state.modal = modal
  },
  CLOSE_MODAL(state) {
    state.modal = null
  },
}
