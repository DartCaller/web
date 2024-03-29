<template>
  <div class="in_game__grid">
    <div class="score__card box_shadow">
      <scoreTable
        :scores="absoluteScores"
        :players="players"
        :show-extra-bg-rows="2"
      />
    </div>
    <actions class="action__card box_shadow" />
    <div class="current_player__card box_shadow">
      <currentPlayer
        :key="currentPlayerName"
        :scores-per-dart="lastThrows"
        :current-player="currentPlayerName"
        :points-remaining="pointsRemainingForCurrentPlayer"
      />
    </div>
    <div class="statistics__card box_shadow">
      <h2>Coming Soon</h2>
    </div>
  </div>
</template>

<script>
import scoreTable from '~/components/scoreTable'
import currentPlayer from '~/components/inGame/currentPlayer/currentPlayer'
import actions from '~/components/inGame/actions'

export default {
  name: 'InGame',
  components: { scoreTable, currentPlayer, actions },
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
    currentRound: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    currentPlayerName() {
      return this.playerNames[this.currentPlayer]
    },
    players() {
      return this.playerOrder.map((playerId) => this.playerNames[playerId])
    },
    lastThrows() {
      const lastRoundOfPlayer =
        this.scores[this.currentPlayer][this.currentRound] || ''
      const lastRoundThrows = lastRoundOfPlayer.match(/([SDT-]\d\d?\d?)/g)
      if (lastRoundThrows === null) {
        return []
      } else {
        return lastRoundThrows.map(this.convertScoreFieldToScore)
      }
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
            const roundThrows = gameRound.match(/([SDT-]\d\d?\d?)/g)
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
      return this.playerOrder.map((playerId) => absoluteScores[playerId])
    },
    pointsRemainingForCurrentPlayer() {
      const currentPlayerIndex = this.playerOrder.indexOf(this.currentPlayer)
      return +this.absoluteScores[currentPlayerIndex][
        this.absoluteScores[currentPlayerIndex].length - 1
      ]
    },
  },
  methods: {
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

<style scoped lang="scss">
.in_game__grid {
  display: grid;
  height: 100%;
  padding: 30px 250px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.2fr 5fr 5fr;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas:
    'score__card action__card'
    'score__card current_player__card'
    'score__card statistics__card';

  .statistics__card,
  .score__card,
  .action__card,
  .current_player__card {
    background-color: $grey;
    border-radius: 10px;
  }

  .score__card {
    grid-area: score__card;
    padding: 20px 40px;
  }

  .statistics__card {
    grid-area: statistics__card;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .current_player__card {
    grid-area: current_player__card;
    padding: 15px 40px;
  }

  .action__card {
    grid-area: action__card;
    display: flex;
    justify-content: space-around;
  }
}

@media (max-width: 1200px) {
  .in_game__grid {
    padding-right: 100px;
    padding-left: 100px;
  }
}
</style>
