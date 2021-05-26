<template>
  <div class="pos_relative">
    <vs-navbar class="nav box_shadow" color="#303030" text-white square>
      <template #left>
        <h2>DartCaller</h2>
      </template>
      <template #right>
        <NuxtLink to="/create-game">
          <styledButton>Game</styledButton>
        </NuxtLink>
        <styledButton>Profile</styledButton>
        <styledButton>Settings</styledButton>
        <styledButton>Logout</styledButton>
      </template>
    </vs-navbar>
    <Nuxt class="flex_grow" />
    <div id="loading_container" />
    <ModalSlot class="global_modal" />
  </div>
</template>

<script>
import styledButton from '~/components/common/StyledButton'
import ModalSlot from '~/components/common/modal/ModalSlot'

export default {
  name: 'DefaultLayout',
  components: {
    styledButton,
    ModalSlot,
  },
}
</script>

<style lang="scss">
.box_shadow {
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 0.6);
}

.nav {
  padding: 10px;
  position: sticky;
}

.pos_relative {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.flex_grow {
  flex-grow: 1;
}

.global_modal,
.loading_container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
