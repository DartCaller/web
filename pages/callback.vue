<template>
  <div />
</template>
<script>
import queryString from 'query-string'
export default {
  data: () => ({
    loading: null,
  }),
  beforeMount() {
    this.loading = this.$vs.loading({
      target: '#loading_container',
      scale: '1.3',
      type: 'circles',
      text: 'Loading Game ...',
      background: 'primary',
      opacity: 0.5,
      color: '#fff',
    })
    if (this.checkIfAuthError()) {
      this.$auth0.setTokenByQuery()
      this.loading.close()
      this.$router.replace({ path: '/' })
    }
  },
  methods: {
    notification(title, text, color = null) {
      const notification = {
        progress: 'auto',
        position: 'top-center',
        duration: 5000,
        title,
        text,
      }
      notification.color = color
      this.$vs.notification(notification)
    },
    checkIfAuthError() {
      const params = queryString.parse(location.hash)
      if (params.error) {
        this.$router.replace({ path: '/' })
        this.notification(
          'Signup Error',
          'Please use the invite link to create your user.',
          'danger'
        )
        return false
      } else {
        return true
      }
    },
  },
}
</script>
