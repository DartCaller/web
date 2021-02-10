<template>
  <vs-button color="#303030">
    <component :is="activeIcon" v-if="activeIcon" class="icon" />
    <p class="small"><slot /></p>
  </vs-button>
</template>

<script>
import check from '~/assets/images/check.svg?inline'
import history from '~/assets/images/history.svg?inline'
import pencil from '~/assets/images/pencil.svg?inline'
import plus from '~/assets/images/plus.svg?inline'
/* eslint-disable vue/no-unused-components */

export default {
  name: 'Button',
  components: {
    check,
    history,
    pencil,
    plus,
  },
  props: {
    icon: {
      default: null,
      type: String,
    },
  },
  data: () => ({
    icons: ['check', 'history', 'pencil', 'plus'],
  }),
  computed: {
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
  width: 20px;
  height: 20px;
  padding-right: 5px;
}
</style>
