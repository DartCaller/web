<template>
  <div class="pos_relative">
    <vs-navbar class="nav box_shadow" color="#303030" text-white square>
      <template #left>
        <h2>DartCaller</h2>
      </template>
      <template #right>
        <vs-button color="#303030"><p>Game</p></vs-button>
        <vs-button color="#303030"><p>Profile</p></vs-button>
        <vs-button color="#303030"><p>Settings</p></vs-button>
        <vs-button color="#303030"><p>Logout</p></vs-button>
      </template>
    </vs-navbar>
    <Nuxt class="flex_grow" />
  </div>
</template>

<style lang="scss">
html {
  font-family: 'Tahoma', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body,
#__nuxt,
#__layout {
  height: 100%;
  background-color: $grey;
  background-image: url('~assets/images/DartboardBackground.svg');
  background-position: center;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  color: white;
}

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
</style>
