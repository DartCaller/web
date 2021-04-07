<template>
  <div class="correct_score_modal small">
    <h2 class="colored mb">Correct Score</h2>
    <div class="row">
      <div>
        <p>For Player:</p>
        <vs-select
          v-model="chosenPlayerID"
          color="#14A76C"
          class="select"
          @input="resetLastScore"
        >
          <vs-option
            v-for="player in allPlayers"
            :key="player.id"
            :label="player.name"
            :value="player.id"
          >
            {{ player.name }}
          </vs-option>
        </vs-select>
      </div>
      <div>
        <p>Last Score:</p>
        <vs-input v-model="newScoreValue" class="input" border success />
      </div>
    </div>
    <div class="hr" />
    <h4 class="mb">Score Preview</h4>
    <scoreTable
      :scores="absoluteScores"
      :players="playersPlusRound"
      :show-only="showOnlyScoreRows"
    />
    <div class="action_button">
      <styled-button secondary> Cancel </styled-button>
      <styled-button primary> Apply </styled-button>
    </div>
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton.vue'
import scoreTable from '~/components/scoreTable'

export default {
  name: 'Modal',
  components: { scoreTable, styledButton },
  data: () => ({
    allPlayers: ['Timon'],
    chosenPlayerID: '',
    newScoreValue: null,
  }),
  computed: {
    lastPlayerScore() {
      if (this.chosenPlayerID) {
        const playerScore = this.$store.state.game.serverState.scores[
          this.chosenPlayerID
        ]
        return playerScore[playerScore.length - 1]
      } else return ''
    },
    game() {
      return this.$store.state.game.serverState
    },
    players() {
      return this.game.playerOrder.map(
        (playerId) => this.game.playerNames[playerId]
      )
    },
    playersPlusRound() {
      return ['Round'].concat(this.players)
    },
    scores() {
      return this.game.scores
    },
    showOnlyScoreRows() {
      const currentRound =
        Math.max(
          ...Object.values(this.game.scores).map((scores) => scores.length)
        ) - 1
      return [currentRound, currentRound - 1]
    },
    absoluteScores() {
      const absoluteScores = {}
      for (const player in this.scores) {
        if (!Object.prototype.hasOwnProperty.call(this.scores, player)) return
        const playerScores = this.scores[player]
        const absolutePlayerScores = (absoluteScores[player] = [])
        for (
          let gameRoundIndex = 0;
          gameRoundIndex < playerScores.length;
          gameRoundIndex++
        ) {
          const gameRound = playerScores[gameRoundIndex]
          if (gameRoundIndex === 0) {
            // That's our start number, no conversion needed
            absolutePlayerScores.push(gameRound)
          } else {
            const previousRoundScore =
              absolutePlayerScores[absolutePlayerScores.length - 1]
            const roundThrows = gameRound.match(/([SDT-]\d\d?)/g)
            const roundScore = roundThrows.reduce(
              (currentScore, scoredField) => {
                const number = this.convertScoreFieldToScore(scoredField)
                return currentScore - number
              },
              previousRoundScore
            )
            absolutePlayerScores.push(roundScore)
          }
        }
      }
      const result = this.game.playerOrder.map(
        (playerId) => absoluteScores[playerId]
      )
      const maxRound = Math.max(
        ...Object.values(this.game.scores).map((scores) => scores.length)
      )
      result.unshift(Array.from({ length: maxRound }, (_, i) => i))
      return result
    },
  },
  created() {
    this.allPlayers = Object.entries(
      this.$store.state.game.serverState.playerNames
    ).map((item) => ({ id: item[0], name: item[1] }))

    this.setDefaultSelectedPlayer()
    this.resetLastScore()
  },
  methods: {
    setDefaultSelectedPlayer() {
      const { playerOrder, currentPlayer } = this.$store.state.game.serverState
      const currentPlayerIndex = playerOrder.indexOf(currentPlayer)
      if (currentPlayerIndex === -1) return
      const lastPlayerIndex =
        currentPlayerIndex !== 0
          ? currentPlayerIndex - 1
          : playerOrder.length - 1
      this.chosenPlayerID = playerOrder[lastPlayerIndex]
    },
    resetLastScore() {
      this.newScoreValue = this.convertScoreStringToScore(this.lastPlayerScore)
    },
    convertScoreStringToScore(scoreString) {
      const roundThrows = scoreString.match(/([SDT-]\d\d?)/g)
      return roundThrows.reduce(
        (currentScore, scoredField) =>
          currentScore + this.convertScoreFieldToScore(scoredField),
        0
      )
    },
    convertScoreFieldToScore(scoreField) {
      // e.g T20 (means Triple 20) -> 60
      const num = scoreField.match(/\d+/).map(Number)[0]
      switch (scoreField[0]) {
        case 'S':
          return num
        case 'D':
          return 2 * num
        case 'T':
          return 3 * num
        default:
          return 0
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.correct_score_modal {
  background-color: $grey;
  border-radius: 10px;
  padding: 20px 40px;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.6);

  .hr {
    width: 100%;
    border: 2px solid $lightgrey;
    margin: 25px 0 20px 0;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > * {
      display: flex;
      align-items: center;

      :not(:first-child) {
        margin-left: 10px;
      }
    }

    .select {
      max-width: 130px;
    }

    .input {
      max-width: 50px;
    }

    * {
      white-space: nowrap;
    }
  }

  .action_button {
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
