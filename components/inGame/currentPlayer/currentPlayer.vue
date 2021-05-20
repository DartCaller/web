<template>
  <div class="current__player__container">
    <h1 class="colored">{{ currentPlayer }}</h1>
    <h2>
      <CountUp
        :delay="0"
        :end-val="pointsRemaining"
        :options="countUpOptions"
      />
      Points remaining
    </h2>
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
  // eslint-disable-next-line object-shorthand
  data: function () {
    return {
      countAnimation: null,
      countUpOptions: {
        duration: 1,
        useEasing: true,
        useGrouping: true,
        startVal: this.pointsRemaining,
      },
    }
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
