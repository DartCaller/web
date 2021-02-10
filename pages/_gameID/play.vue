<template>
  <div class="in_game__grid">
    <div class="score__card box_shadow">
      <scoreTable :scores="scores" :players="players" />
    </div>
    <div class="action__card box_shadow">
      <styledButton icon="plus">New Game</styledButton>
      <styledButton icon="pencil">Correct Score</styledButton>
      <styledButton icon="history">Revert last Dart</styledButton>
    </div>
    <div class="current_player__card box_shadow"></div>
    <div class="statistics__card box_shadow"></div>
  </div>
</template>

<script>
import styledButton from '~/components/common/Button'
import scoreTable from '~/components/scoreTable'

export default {
  name: 'InGame',
  components: { styledButton, scoreTable },
  data: () => ({
    players: ['Lewe', 'Heiko', 'Timon'],
    playerIndex: 0,
    scores: [
      [501, 501, 501],
      [455, 430, 480],
      [423, 383, 435],
      [374, 345, 386],
      [351, 298, 335],
      [302, 245, 299],
      [275, 166, 245],
      [221, 123, 212],
      [140, 89, 183],
      [40, 72, 100],
      [0, 40, 40],
      ['', 40, 0],
      ['', 0, ''],
    ],
  }),
  computed: {
    currentPlayer() {
      return this.players[this.playerIndex]
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
  column-gap: 30px;
  row-gap: 30px;
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
  }

  .current_player__card {
    grid-area: current_player__card;
  }

  .action__card {
    grid-area: action__card;
    display: flex;
    justify-content: space-around;
  }
}
</style>
