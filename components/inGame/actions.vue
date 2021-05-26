<template>
  <actionsPure
    :leg-finished="$store.state.game.serverState.legFinished"
    @createGame="onCreateGame"
    @nextLeg="onNextLeg"
    @exit="onExit"
    @correctScore="onCorrectScore"
    @revertDart="onRevertDart"
  />
</template>

<script>
import actionsPure from './actionsPure'
export default {
  name: 'Actions',
  components: { actionsPure },
  methods: {
    onCreateGame() {
      this.$router.push({ path: '/create-game' })
    },
    onExit() {
      this.$router.push({ path: '/' })
    },
    onCorrectScore() {
      this.$store.commit('OPEN_MODAL', 'CorrectScore')
    },
    onRevertDart() {},
    onNextLeg() {
      this.$io.socket.send(
        JSON.stringify({
          type: 'NextLeg',
          gameID: this.$route.params.gameID,
        })
      )
    },
  },
}
</script>
