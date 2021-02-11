<template>
  <div class="container">
    <div v-for="i in 3" :key="i" class="dart">
      <dart-svg class="dartSvg" :class="{ active: scoresPerDart[i - 1] }" />
      <p class="score">{{ scoresPerDart[i - 1] || '' }}</p>
    </div>
  </div>
</template>

<script>
import dartSvg from '~/assets/images/dart.svg?inline'

export default {
  name: 'ScorePerDartDisplay',
  components: {
    dartSvg,
  },
  props: {
    scoresPerDart: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
}
.dart {
  display: flex;
  flex-direction: column;

  .dartSvg {
    height: 60px;
    width: 60px;
    margin: 0 10px;

    g {
      fill: $lightgrey;
    }

    &.active g {
      fill: $white;
    }
  }

  * {
    text-align: center;
  }
}
</style>
