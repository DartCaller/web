export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dart Caller',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuesax/dist/vuesax.css', '../assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    { src: '~/plugins/socket', ssr: false },
    { src: '~/plugins/countUp', ssr: false },
    { src: '~/plugins/auth0', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/vue-typer', ssr: false },
  ],

  env: {
    BACKEND_ADDRESS: process.env.REST_ADDRESS || 'https://dart-api.timon.codes',
    WS_ADDRESS: process.env.WS_ADDRESS || 'wss://dart-api.timon.codes/ws',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [].concat(
    process.env.NODE_ENV === 'production'
      ? []
      : ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module']
  ),

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],

  styleResources: {
    scss: ['@/assets/scss/*.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
