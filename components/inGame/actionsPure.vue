<template>
  <div class="actions-pure__wrapper">
    <template v-if="legFinished">
      <styledButton icon="plus" small-text @click="$emit('createGame')">
        New Game
      </styledButton>
      <styledButton icon="plus" small-text @click="$emit('nextLeg')"
        >Next Leg
      </styledButton>
      <styledButton icon="pencil" small-text>Statistics</styledButton>
      <styledButton icon="check" small-text @click="$emit('exit')">
        Exit
      </styledButton>
    </template>
    <template v-else>
      <styledButton icon="check" small-text>Finish Current Turn</styledButton>
      <styledButton icon="pencil" small-text @click="$emit('correctScore')"
        >Correct Score
      </styledButton>
      <styledButton icon="history" small-text @click="$emit('revertDart')">
        Revert last Dart
      </styledButton>
    </template>
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton'
export default {
  name: 'Actions',
  components: { styledButton },
  props: {
    legFinished: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.actions-pure__wrapper {
  display: flex;
  flex-direction: row;
}
</style>
