<template>
  <div class="create_game__container">
    <h1>Create Game</h1>
    <div class="cards__container">
      <div class="player__card box_shadow">
        <playerMenu @input="players = $event" />
      </div>
      <div class="settings__card box_shadow">
        <settingsMenu @input="settings = $event" />
      </div>
    </div>
    <styled-button primary :loading="loading" @click.native="startGame"
      >Start Game</styled-button
    >
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton.vue'
import playerMenu from '~/components/gameCreation/playerMenu.vue'
import settingsMenu from '~/components/gameCreation/settingsMenu.vue'

export default {
  name: 'CreateGame',
  components: { styledButton, playerMenu, settingsMenu },
  data: () => ({
    socket: null,
    players: [],
    settings: {},
    loading: false,
  }),
  methods: {
    startGame() {
      this.loading = true
      this.$store.commit('game/SET_GAME_STATE', 'CREATE')
      this.$io.socket.send(
        JSON.stringify({
          type: 'CreateGame',
          players: this.players.map((e) => e.name),
          gameMode: this.settings.gameMode,
        })
      )
      this.$io.addEventListener((data) => {
        if (this.$store.state.game.gameState === 'CREATE') {
          this.$store.commit('game/SET_SUBSCRIBED', true)
          const initialGameState = JSON.parse(data.data)
          this.$router.push({
            path: `/${initialGameState.legID}/play`,
          })
          this.$store.commit('game/SET_GAME_STATE', 'PLAY')
          this.$store.commit('game/SET_SERVER_STATE', initialGameState)
        } else {
          this.$store.commit('game/SET_SERVER_STATE', JSON.parse(data.data))
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.create_game__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 50px;
  }

  > * {
    margin: 15px 0;
  }
}

.cards__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas: 'players settings';

  .player__card,
  .settings__card {
    background-color: $grey;
    border-radius: 10px;
    padding: 20px 40px;
    min-width: 35vw;
    min-height: 40vh;
  }

  .player__card {
    grid-area: players;
  }

  .settings__card {
    grid-area: settings;
  }
}
</style>
