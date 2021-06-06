<template>
  <the-nav-bar-pure
    :logged-in="loggedIn"
    :items="navItems"
    :items-logged-in="loggedInNavItems"
  />
</template>

<script>
import TheNavBarPure from '~/components/TheNavBarPure'

export default {
  name: 'TheNavBar',
  components: { TheNavBarPure },
  data() {
    return {
      loggedInNavItems: [
        { label: 'Game', href: 'create-game' },
        { label: 'Profile', clickHandler: this.notImplemented },
        { label: 'Settings', clickHandler: this.notImplemented },
        { label: 'Logout', clickHandler: this.logout },
      ],
      navItems: [{ label: 'Login', clickHandler: this.login }],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.accessToken !== null
    },
  },
  methods: {
    login() {
      this.$auth0.login()
    },
    logout() {
      this.$auth0.logout()
    },
    notImplemented() {
      this.$vs.notification({
        progress: 'auto',
        position: 'top-center',
        duration: 5000,
        title: 'Not yet implemented',
        text:
          'But Timon, Pumba and the whole Lion King family is busy as a bee working on it.',
      })
    },
  },
}
</script>
