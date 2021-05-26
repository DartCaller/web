<template>
  <div class="container">
    <div
      v-for="i in 3"
      :key="i"
      class="dart"
      :class="{ active: stringScores[i - 1] }"
    >
      <dart-svg class="dartSvg" />
      <p class="score">{{ stringScores[i - 1] || '_' }}</p>
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
  computed: {
    stringScores() {
      return this.scoresPerDart.map((i) => i !== undefined && i.toString())
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

  .score {
    color: rgba(var(--lightgrey), 1);
  }

  .dartSvg {
    height: 60px;
    width: 60px;
    margin: 0 10px;

    g {
      fill: rgba(var(--lightgrey), 1);
    }
  }

  &.active {
    .dartSvg g {
      fill: #fff;
    }

    .score {
      color: #fff;
    }
  }

  * {
    text-align: center;
  }
}
</style>
