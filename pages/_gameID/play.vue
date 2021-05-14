<template>
  <pureIngame
    v-if="game"
    :player-names="game.playerNames"
    :player-order="game.playerOrder"
    :current-player="game.currentPlayer"
    :scores="game.scores"
    :current-round="game.currentRoundIndex + 1"
  />
</template>

<script>
import pureIngame from '~/components/inGame/pureIngame'

export default {
  name: 'InGame',
  components: { pureIngame },
  data: () => ({
    game: null,
    loading: null,
  }),
  computed: {
    networkGame() {
      return this.$store.state.game.serverState
    },
    players() {
      return this.game.playerOrder.map(
        (playerId) => this.game.playerNames[playerId]
      )
    },
  },
  watch: {
    networkGame: {
      deep: true,
      handler(newV, oldV) {
        if (newV.currentPlayer !== oldV.currentPlayer && this.game) {
          this.updateGame({ scores: newV.scores })
          setTimeout(() => {
            this.updateGame(newV)
          }, 1000)
        } else {
          this.updateGame(newV)
        }
      },
    },
  },
  created() {},
  mounted() {
    if (!this.$store.state.game.subscribed) {
      this.loading = this.$vs.loading({
        target: '#loading_container',
        scale: '1.3',
        type: 'circles',
        text: 'Loading Game ...',
        background: 'primary',
        opacity: 0.5,
        color: '#fff',
      })
      this.connectToGame(this.$route.params.gameID)
    } else {
      this.game = this.networkGame
    }
  },
  methods: {
    connectToGame(gameID) {
      this.$io.socket.onopen = () => {
        this.$io.socket.send(
          JSON.stringify({
            type: 'JoinGame',
            gameID,
          })
        )
        this.$store.commit('game/SET_GAME_STATE', 'JOIN')
        this.$io.addEventListener((data) => {
          if (this.$store.state.game.gameState === 'JOIN') {
            this.$store.commit('game/SET_SUBSCRIBED', true)
            this.$store.commit('game/SET_GAME_STATE', 'PLAY')
            this.loading.close()
          }
          this.$store.commit('game/SET_SERVER_STATE', JSON.parse(data.data))
        })
      }
    },
    updateGame(newGameState) {
      this.game = {
        ...this.game,
        ...newGameState,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.in_game__grid {
  display: grid;
  height: 100%;
  padding: 30px 250px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.2fr 5fr 5fr;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas:
    'score__card action__card'
    'score__card current_player__card'
    'score__card statistics__card';

  .statistics__card,
  .score__card,
  .action__card,
  .current_player__card {
    background-color: $grey;
    border-radius: 10px;
  }

  .score__card {
    grid-area: score__card;
    padding: 20px 40px;
  }

  .statistics__card {
    grid-area: statistics__card;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .current_player__card {
    grid-area: current_player__card;
    padding: 15px 40px;
  }

  .action__card {
    grid-area: action__card;
    display: flex;
    justify-content: space-around;
  }
}

@media (max-width: 1200px) {
  .in_game__grid {
    padding-right: 100px;
    padding-left: 100px;
  }
}
</style>
