<template>
  <div class="row__container">
    <div>
      <vs-avatar size="30" color="#303030">
        <img src="~/assets/images/player.png" alt="player image" />
      </vs-avatar>
      <div class="name">
        <vs-input
          v-if="editMode || nameIsEmpty"
          border
          success
          class="input"
          :value="player.name"
          placeholder="Name"
          data-test="player-row__input"
          @input="newName = $event"
          @blur="onSubmit"
          @keyup.enter="onSubmit"
        />
        <p
          v-else
          class="label"
          data-test="player-row__display"
          @click="editMode = true"
        >
          {{ player.name }}
        </p>
      </div>
    </div>
    <div>
      <p v-if="!nameIsEmpty" class="gamesPlayed">{{ player.games }} games</p>
      <delete-svg
        class="delete_button"
        data-test="player-row__delete"
        @click="$emit('delete')"
      />
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
  methods: {
    onSubmit() {
      this.editMode = false
      this.$emit('input', this.newName)
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
    height: 24px;
    width: auto;
  }

  .name .input {
    margin-left: -5px;
  }

  .name .label {
    border: 2px solid transparent;
    margin-left: 5px;
    padding: 5px 0;
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
