<template>
  <CorrectScorePure
    :player-names="game.playerNames"
    :player-order="game.playerOrder"
    :current-player="game.currentPlayer"
    :scores="game.scores"
    :game-i-d="game.gameID"
  />
</template>

<script>
import CorrectScorePure from '~/components/common/modal/CorrectScorePure.vue'

export default {
  name: 'Modal',
  components: { CorrectScorePure },
  data: () => ({
    allPlayers: [],
    chosenPlayerID: '',
    newScoreValue: null,
  }),
  computed: {
    game() {
      return this.$store.state.game.serverState
    },
  },
}
</script>
