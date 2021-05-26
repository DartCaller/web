<template>
  <span>{{ endVal }}</span>
</template>

<script>
export default {
  name: 'CountUp',
  props: {
    endVal: {
      type: Number,
      required: true,
    },
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
    options: {
      type: Object,
      required: false,
    },
  },
}
</script>
