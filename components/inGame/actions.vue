<template>
  <div>
    <template v-if="$store.state.game.serverState.legFinished">
      <styledButton
        icon="plus"
        small-text
        @click.native="$router.push({ path: '/create-game' })"
        >New Game</styledButton
      >
      <styledButton icon="plus" small-text @click.native="nextLeg"
        >Next Leg</styledButton
      >
      <styledButton icon="pencil" small-text>Statistics</styledButton>
      <styledButton
        icon="check"
        small-text
        @click.native="$router.push({ path: '/' })"
        >Exit</styledButton
      >
    </template>
    <template v-else>
      <styledButton icon="check" small-text>Finish Current Turn</styledButton>
      <styledButton
        icon="pencil"
        small-text
        @click.native="$store.commit('OPEN_MODAL', 'CorrectScore')"
        >Correct Score</styledButton
      >
      <styledButton icon="history" small-text>Revert last Dart</styledButton>
    </template>
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton'
export default {
  name: 'Actions',
  components: { styledButton },
  methods: {
    nextLeg() {
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
