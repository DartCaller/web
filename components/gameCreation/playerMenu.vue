<template>
  <div>
    <h2>Players</h2>
    <div class="player_list">
      <playerRow />
    </div>
    <div class="addPlayer">
      <styled-button>
        <div class="flex">
          <plusSvg />
          <p>Add Player</p>
        </div>
      </styled-button>
    </div>
  </div>
</template>

<script>
import plusSvg from '~/assets/images/plus.svg?inline'
import styledButton from '~/components/common/StyledButton.vue'
import playerRow from '~/components/gameCreation/modules/playerRow.vue'

export default {
  name: 'PlayerMenu',
  components: {
    plusSvg,
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

  .flex {
    display: flex;
    align-items: center;
    margin-left: -4px;

    *:first-child {
      margin-right: 23px;
    }
  }
}
</style>
