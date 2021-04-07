<template>
  <div v-if="!!activeModal" class="modal_slot_root">
    <div class="darkening_background"></div>
    <div class="modal_slot">
      <component :is="activeModal.component" />
    </div>
  </div>
</template>

<script>
import CorrectScore from '~/components/common/modal/CorrectScore'

export default {
  name: 'Modal',
  components: { CorrectScore },
  data: () => ({
    availableModals: [{ component: 'CorrectScore' }],
  }),
  computed: {
    current_modal_name() {
      return this.$store.state.modal
    },
    activeModal() {
      return this.availableModals.find(
        (modal) =>
          (modal.matcher || modal.component) === this.current_modal_name
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.darkening_background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(25, 25, 25, 0.5);
  z-index: 9010;
}
.modal_slot {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9011;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
