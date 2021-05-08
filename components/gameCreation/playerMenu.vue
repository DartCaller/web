<template>
  <div>
    <h2 class="mb">Players</h2>
    <div class="player_list">
      <playerRow
        v-for="(player, index) in players"
        :key="'p-' + index"
        :player="player"
        class="player_row"
        @input="(name) => handlePlayerNameInput(name, index)"
        @keydown.tab.native="addPlayer"
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
    players: [{ name: '', games: '' }],
  }),
  methods: {
    addPlayer() {
      this.players.push({
        name: '',
        games: '',
      })
    },
    handlePlayerNameInput(name, index) {
      this.players[index].name = name
      this.players[index].games = Math.floor(Math.random() * Math.floor(1000))
      this.$emit('input', this.players)
    },
  },
}
</script>

<style scoped lang="scss">
.player_row {
  margin: 10px 0;
}

.addPlayer {
  width: 100%;
  text-align: left;

  /deep/ .vs-button__content svg {
    margin-right: 23px;
    margin-left: -4px;
  }
}
</style>
