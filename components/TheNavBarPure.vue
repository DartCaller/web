<template>
  <vs-navbar color="#303030" text-white square>
    <template #left>
      <h2>DartCaller</h2>
    </template>
    <template #right>
      <template v-for="item in itemsToDisplay">
        <template v-if="item.href">
          <NuxtLink :key="item.label" :to="item.href">
            <styledButton>{{ item.label }}</styledButton>
          </NuxtLink>
        </template>
        <template v-else>
          <styledButton :key="item.label" @click="item.clickHandler">
            {{ item.label }}
          </styledButton>
        </template>
      </template>
    </template>
  </vs-navbar>
</template>

<script>
import styledButton from '~/components/common/StyledButton'

export default {
  name: 'TheNavBar',
  components: { styledButton },
  props: {
    loggedIn: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    itemsLoggedIn: {
      type: Array,
      required: true,
    },
  },
  computed: {
    itemsToDisplay() {
      return this.loggedIn ? this.itemsLoggedIn : this.items
    },
  },
}
</script>
