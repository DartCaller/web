<template>
  <div>
    <h2>Players</h2>
    <div class="player_list">
      <playerRow
        v-for="(player, index) in players"
        :key="player.name + player.account"
        :player="player"
        class="player_row"
        @input="(name) => handlePlayerNameInput(name, index)"
        @delete="players.splice(index, 1)"
      />
    </div>
    <div class="addPlayer">
      <styled-button icon="plus" @click.native="addPlayer">
        Add Player
      </styled-button>
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
    players: [{ name: '', account: false }],
  }),
  methods: {
    addPlayer() {
      this.players.push({ name: '', account: false })
    },
    handlePlayerNameInput(name, index) {
      this.players[index].name = name
      this.$emit('input', this.players)
    },
  },
}
</script>

<style scoped lang="scss">
h2 {
  margin-bottom: 15px;
}

.player_row {
  margin: 10px 0;
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
