<template>
  <div />
</template>
<script>
export default {
  data: () => ({
    loading: null,
  }),
  beforeMount() {
    this.loading = this.$vs.loading({
      target: '#loading_container',
      scale: '1.3',
      type: 'circles',
      text: 'Login in ...',
      background: 'primary',
      opacity: 0.5,
      color: '#fff',
    })
    this.$auth0.autoLogin(() => {
      this.loading.close()
    })
  },
}
</script>
