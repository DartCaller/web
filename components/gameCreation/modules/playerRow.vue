<template>
  <div class="row__container">
    <div>
      <vs-avatar size="30" color="#303030">
        <img src="~/assets/images/player.png" alt="player image" />
      </vs-avatar>
      <p class="name">Lewe</p>
    </div>
    <div>
      <p class="gamesPlayed">
        {{ Math.floor(Math.random() * Math.floor(1000)) }} games
      </p>
      <delete-svg />
    </div>
  </div>
</template>

<script>
import deleteSvg from '~/assets/images/x.svg?inline'

export default {
  name: 'PlayerRow',
  components: { deleteSvg },
}
</script>

<style scoped lang="scss">
.row__container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    display: flex;
    align-items: center;

    > * {
      margin: 0 10px;
    }
  }
}
</style>
