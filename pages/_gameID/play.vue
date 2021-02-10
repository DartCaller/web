<template>
  <div class="in_game__grid">
    <div class="score__card box_shadow"></div>
    <div class="action__card box_shadow"></div>
    <div class="current_player__card box_shadow"></div>
    <div class="statistics__card box_shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'InGame',
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
  }

  .statistics__card {
    grid-area: statistics__card;
  }

  .current_player__card {
    grid-area: current_player__card;
  }

  .action__card {
    grid-area: action__card;
  }
}
</style>
