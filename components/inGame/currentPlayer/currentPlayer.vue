<template>
  <div class="current__player__container">
    <h1 class="colored">{{ currentPlayer }}</h1>
    <h2>{{ pointsRemaining }} Points remaining</h2>
    <scorePerDartDisplay :scores-per-dart="scoresPerDart" />
  </div>
</template>

<script>
import scorePerDartDisplay from '~/components/inGame/currentPlayer/scorePerDartDisplay.vue'

export default {
  name: 'CurrentPlayer',
  components: {
    scorePerDartDisplay,
  },
  props: {
    scoresPerDart: {
      type: Array,
      default: () => [],
    },
    currentPlayer: {
      type: String,
      required: true,
    },
    pointsRemaining: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.current__player__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
