<template>
  <div>
    <h2>Players</h2>
    <div class="player_list">
      <playerRow />
    </div>
    <div class="addPlayer">
      <styled-button icon="plus"> Add Player </styled-button>
    </div>
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton.vue'
import playerRow from '~/components/gameCreation/modules/playerRow.vue'

export default {
  name: 'PlayerMenu',
  components: {
    styledButton,
    playerRow,
  },
  data: () => ({
    players: [],
  }),
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 15px;
}

.addPlayer {
  width: 100%;
  text-align: left;

  /deep/ .vs-button__content svg {
    margin-right: 20px;
    margin-left: -1px;
  }
}
</style>
