<template>
  <div class="row__container">
    <div>
      <vs-avatar size="30" color="#303030">
        <img src="~/assets/images/player.png" alt="player image" />
      </vs-avatar>
      <div class="name">
        <vs-input
          v-if="editMode || nameIsEmpty"
          :value="player.name"
          placeholder="Name"
          @input="newName = $event"
          @blur="$emit('input', newName)"
          @keyup.enter="$emit('input', newName)"
        />
        <p v-else @click="editMode = true">
          {{ player.name }}
        </p>
      </div>
    </div>
    <div>
      <p v-if="!nameIsEmpty" class="gamesPlayed">
        {{ Math.floor(Math.random() * Math.floor(1000)) }} games
      </p>
      <delete-svg class="delete_button" @click="$emit('delete')" />
    </div>
  </div>
</template>

<script>
import deleteSvg from '~/assets/images/x.svg?inline'

export default {
  name: 'PlayerRow',
  components: { deleteSvg },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    editMode: false,
    newName: '',
  }),
  computed: {
    nameIsEmpty() {
      return this.player.name === ''
    },
  },
}
</script>

<style scoped lang="scss">
.row__container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .delete_button {
    cursor: pointer;
  }

  > * {
    display: flex;
    align-items: center;

    > * {
      margin: 0 10px;
    }
  }
}
</style>
