<template>
  <vs-button :color="buttonColor" :loading="loading">
    <component
      :is="activeIcon"
      v-if="activeIcon"
      class="icon"
      :class="{ small: smallText }"
    />
    <p :class="{ small: smallText }"><slot /></p>
  </vs-button>
</template>

<script>
import check from '~/assets/images/check.svg?inline'
import history from '~/assets/images/history.svg?inline'
import pencil from '~/assets/images/pencil.svg?inline'
import plus from '~/assets/images/plus.svg?inline'
/* eslint-disable vue/no-unused-components */

export default {
  name: 'StyledButton',
  components: {
    check,
    history,
    pencil,
    plus,
  },
  props: {
    loading: Boolean,
    primary: Boolean,
    smallText: Boolean,
    icon: {
      default: null,
      type: String,
    },
  },
  data: () => ({
    icons: ['check', 'history', 'pencil', 'plus'],
  }),
  computed: {
    buttonColor() {
      return this.primary ? '#14A76C' : '#303030'
    },
    activeIcon() {
      return this.icon && this.icons.includes(this.icon) ? this.icon : null
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  white-space: nowrap;
}

.icon {
  width: 24px;
  height: 24px;
  padding-right: 5px;

  &.small {
    width: 20px;
    height: 20px;
  }
}
</style>
