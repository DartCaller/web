export default function ({ store, route, redirect }) {
  // check if user has a valid (not expired) token
  if (!store.state.accessToken || store.state.expiresAt < Date.now()) {
    return redirect('/login?redirect=' + encodeURIComponent(route.fullPath))
  }
}
