<template>
  <div class="current__player__container">
    <h1 class="colored">{{ currentPlayer }}</h1>
    <h2><span id="current__player__score">0</span> Points remaining</h2>
    <scorePerDartDisplay :scores-per-dart="scoresPerDart" />
  </div>
</template>

<script>
import { CountUp } from 'countup.js'
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
  data: () => ({
    countAnimation: null,
  }),
  watch: {
    pointsRemaining(newV, oldV) {
      this.countAnimation.update(newV)
    },
  },
  mounted() {
    this.countAnimation = new CountUp(
      'current__player__score',
      this.pointsRemaining,
      { startVal: this.pointsRemaining, duration: 1 }
    )
    this.countAnimation.start()
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
