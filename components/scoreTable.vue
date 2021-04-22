<template>
  <table>
    <thead>
      <tr>
        <th v-for="(player, h) in players" :key="h" class="colored">
          {{ player }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="roundIndex in tableRowsToRender + showExtraBgRows"
        :key="roundIndex"
      >
        <td v-for="(playerScore, j) in filteredRows" :key="j">
          <three-dots v-if="playerScore[roundIndex - 1] === null" />
          <template v-else-if="playerScore[roundIndex - 1] !== undefined">
            {{ playerScore[roundIndex - 1] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import threeDots from '~/assets/images/threeDots.svg?inline'

export default {
  name: 'ScoreTable',
  components: { threeDots },
  props: {
    players: {
      required: true,
      type: Array,
    },
    scores: {
      required: true,
      type: Array,
    },
    showExtraBgRows: {
      type: Number,
      default: 0,
    },
    showOnly: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filteredRows() {
      if (!this.showOnly || this.showOnly.length === 0) return this.scores
      else
        return this.scores.map((playerScores) => {
          return playerScores.reduce((filteredPlayerScore, currentScore, i) => {
            if (this.showOnly.includes(i)) {
              filteredPlayerScore.push(currentScore)
            } else if (
              filteredPlayerScore[filteredPlayerScore.length - 1] !== null
            ) {
              filteredPlayerScore.push(null)
            }
            return filteredPlayerScore
          }, [])
        })
    },
    tableRowsToRender() {
      return Math.max(
        ...Object.values(this.filteredRows).map((scores) => scores.length)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: center;
  border: 0;
  border-collapse: separate;
  border-spacing: 0 5px;

  thead * {
    border-bottom: 2px solid white;
  }

  tr {
    height: 30px;
  }

  tr:nth-child(even) {
    background-color: $lightgrey;

    td:first-child {
      border-radius: 5px 0 0 5px;
    }

    td:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
}
</style>
