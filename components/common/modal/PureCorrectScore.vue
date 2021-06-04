<template>
  <div class="correct_score_modal small">
    <h2 class="colored mb text-center">Correct Score</h2>
    <div class="row">
      <div>
        <p class="label">For Player:</p>
        <vs-select
          v-model="chosenPlayerID"
          color="#14A76C"
          class="select"
          @input="handleChosenPlayerInput"
        >
          <template v-if="invalidChosenPlayer" #message-danger>
            Invalid
          </template>
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
        <p class="label">Last Score:</p>
        <vs-input v-model="newScoreValue" class="input" border success>
          <template v-if="!newScoreIsValid" #message-danger> Invalid </template>
        </vs-input>
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
      <styled-button
        secondary
        @click.native="() => $store.commit('CLOSE_MODAL')"
      >
        Cancel
      </styled-button>
      <styled-button primary @click.native="onSubmit"> Apply </styled-button>
    </div>
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton.vue'
import scoreTable from '~/components/scoreTable'

export default {
  name: 'Modal',
  components: { scoreTable, styledButton },
  props: {
    playerNames: {
      type: Object,
      required: true,
    },
    playerOrder: {
      type: Array,
      required: true,
    },
    currentPlayer: {
      type: String,
      required: true,
    },
    scores: {
      type: Object,
      required: true,
    },
    gameID: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    allPlayers: [],
    chosenPlayerID: '',
    newScoreValue: null,
  }),
  computed: {
    invalidChosenPlayer() {
      return this.chosenPlayerID === this.currentPlayer
    },
    lastRoundForCurrentPlayer() {
      if (this.chosenPlayerID) {
        return this.scores[this.chosenPlayerID].length - 1
      } else return 0
    },
    lastPlayerScore() {
      if (this.chosenPlayerID) {
        return this.scores[this.chosenPlayerID][this.lastRoundForCurrentPlayer]
      } else return 0
    },
    newScoreIsValid() {
      return (
        this.calculateAbsolutePlayerScore(
          this.updatedScores[this.chosenPlayerID]
        )[this.lastRoundForCurrentPlayer] >= 0 &&
        Number(this.newScoreValue) <= 180 &&
        Number(this.newScoreValue) >= 0
      )
    },
    players() {
      return this.playerOrder.map((playerId) => this.playerNames[playerId])
    },
    playersPlusRound() {
      return ['Round'].concat(this.players)
    },
    updatedScores() {
      const scoresToBeUpdated = JSON.parse(JSON.stringify(this.scores))
      scoresToBeUpdated[this.chosenPlayerID].splice(
        this.lastRoundForCurrentPlayer,
        1,
        `S${this.newScoreValue}`
      )
      return scoresToBeUpdated
    },
    showOnlyScoreRows() {
      const currentRound =
        Math.max(...Object.values(this.scores).map((scores) => scores.length)) -
        1
      return [currentRound, currentRound - 1]
    },
    absoluteScores() {
      const absoluteScores = {}
      for (const player in this.updatedScores) {
        if (!Object.prototype.hasOwnProperty.call(this.updatedScores, player))
          return
        const playerScores = this.updatedScores[player]
        absoluteScores[player] = this.calculateAbsolutePlayerScore(playerScores)
      }
      const result = this.playerOrder.map(
        (playerId) => absoluteScores[playerId]
      )
      const maxRound = Math.max(
        ...Object.values(this.scores).map((scores) => scores.length)
      )
      result.unshift(Array.from({ length: maxRound }, (_, i) => i))
      return result
    },
  },
  created() {
    this.allPlayers = Object.entries(this.playerNames).map((item) => ({
      id: item[0],
      name: item[1],
    }))

    this.setDefaultSelectedPlayer()
    this.resetLastScore()
  },
  methods: {
    onSubmit() {
      if (!this.newScoreIsValid) return
      this.$axios
        .post(
          `http://localhost:8080/game/${this.gameID}/correctScore`,
          JSON.stringify({
            playerId: this.chosenPlayerID,
            scoreString: `S${this.newScoreValue}S0S0`,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.$store.commit('CLOSE_MODAL')
        })
        .catch(console.error)
    },
    handleChosenPlayerInput() {
      if (this.invalidChosenPlayer === true) {
        this.$vs.notification({
          progress: 'auto',
          position: 'top-center',
          duration: 5000,
          title: 'Invalid Player',
          text:
            "You can't change a players' score when it's currently his turn. Finish the turn first and then you can change it.",
        })
      }
      this.resetLastScore()
    },
    calculateAbsolutePlayerScore(playerScores) {
      const absolutePlayerScores = []
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
          const roundThrows = gameRound.match(/([SDT-]\d{1,3})/g)
          if (roundThrows) {
            const roundScore = roundThrows.reduce(
              (currentScore, scoredField) => {
                const number = this.convertScoreFieldToScore(scoredField)
                return currentScore - number
              },
              previousRoundScore
            )
            absolutePlayerScores.push(roundScore)
          } else {
            absolutePlayerScores.push(previousRoundScore)
          }
        }
      }
      return absolutePlayerScores
    },
    setDefaultSelectedPlayer() {
      const currentPlayerIndex = this.playerOrder.indexOf(this.currentPlayer)
      if (currentPlayerIndex === -1) return
      const lastPlayerIndex =
        currentPlayerIndex !== 0
          ? currentPlayerIndex - 1
          : this.playerOrder.length - 1
      this.chosenPlayerID = this.playerOrder[lastPlayerIndex]
    },
    resetLastScore() {
      this.newScoreValue = this.convertScoreStringToScore(this.lastPlayerScore)
    },
    convertScoreStringToScore(scoreString) {
      const roundThrows = scoreString.match(/([SDT-]\d{1,3})/g)
      return roundThrows.reduce(
        (currentScore, scoredField) =>
          currentScore + this.convertScoreFieldToScore(scoredField),
        0
      )
    },
    convertScoreFieldToScore(scoreField) {
      // e.g T20 (means Triple 20) -> 60
      const num = scoreField.match(/\d{1,3}/).map(Number)[0]
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
  background-color: rgba(var(--grey), 1);
  border-radius: 10px;
  padding: 20px 40px;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.6);

  .hr {
    width: 100%;
    border: 2px solid rgba(var(--lightgrey), 1);
    margin: 25px 0 20px 0;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    > * {
      display: flex;
      align-items: center;

      .label {
        margin-right: 10px;
      }
    }

    .select {
      max-width: 130px;
    }

    .input {
      &::v-deep input {
        max-width: 60px;
        text-align: center;

        &:focus {
          padding-left: 9.5px;
        }
      }

      &::v-deep .vs-input__message {
        bottom: -2px;
        margin: auto;
      }
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
