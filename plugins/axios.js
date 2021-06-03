export default function ({ store, $axios }) {
  $axios.defaults.baseURL = process.env.BACKEND_ADDRESS

  $axios.onRequest((config) => {
    if (store.state.accessToken) {
      config.headers.Authorization = 'Bearer ' + store.state.accessToken
    }
    return config
  })
}
