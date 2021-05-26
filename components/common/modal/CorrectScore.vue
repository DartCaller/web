<template>
  <PureCorrectScore
    :player-names="game.playerNames"
    :player-order="game.playerOrder"
    :current-player="game.currentPlayer"
    :scores="game.scores"
    :game-i-d="game.gameID"
  />
</template>

<script>
import PureCorrectScore from '~/components/common/modal/PureCorrectScore.vue'

export default {
  name: 'Modal',
  components: { PureCorrectScore },
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
