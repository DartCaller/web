<template>
  <create-game />
</template>

<script>
import CreateGame from '~/components/gameCreation/createGame'

export default {
  name: 'CreateGamePage',
  components: { CreateGame },
  middleware: ['auth'],
  async mounted() {
    try {
      await this.$socket.connect()
    } catch (e) {
      this.$vs.notification({
        progress: 'auto',
        position: 'top-center',
        duration: 5000,
        title: 'Not Authenticated',
        text: e,
        color: 'danger',
      })
    }
  },
}
</script>
