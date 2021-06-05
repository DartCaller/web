import auth0 from 'auth0-js'
import queryString from 'query-string'

class Auth0Util {
  constructor(context) {
    this.context = context
    if (process.client) {
      this.webAuth = new auth0.WebAuth({
        domain: 'dartcaller.eu.auth0.com',
        clientID: 'OE79hFw5JTRDFTp5j7KQLEQrTw2Woaei',
        redirectUri: this.getBaseUrl() + '/callback',
        audience: 'https://dartcaller.eu.auth0.com/api/v2/',
        responseType: 'token',
      })

      setInterval(() => {
        if (
          this.context.app.store.state.accessToken ||
          this.context.store.state.accessToken
        ) {
          this.renewTokens()
        }
      }, 1000 * 40)
    }
  }

  init(mode) {
    this.webAuth.authorize({ mode })
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  getQueryParams() {
    return queryString.parse(location.hash)
  }

  setToken(accessToken, idToken, expiresIn) {
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV === 'development') console.info(accessToken)
    this.context.app.store.commit('SET_USER_ACCESS_TOKEN', accessToken)
    this.context.app.store.commit(
      'SET_USER_EXPIRESAT',
      expiresIn * 1000 + new Date().getTime()
    )
  }

  logout() {
    localStorage.removeItem('data')
    this.webAuth.logout({ returnTo: this.getBaseUrl() })
  }

  setTokenByQuery() {
    const params = this.getQueryParams()
    this.setToken(params.access_token, params.id_token, params.expires_in)
  }

  isAuthenticated() {
    if (this.context) {
      const expiresAt = this.context.app.store.state.expiresAt
      return new Date().getTime() < expiresAt
    } else return false
  }

  renewTokens() {
    if (!this.isAuthenticated()) {
      this.webAuth.checkSession(
        {
          redirectUri: this.getBaseUrl() + '/callback',
        },
        (err, result) => {
          if (!err) {
            this.setToken(result.accessToken, result.idToken, result.expiresIn)
          } else this.init('login')
        }
      )
    }
  }

  login() {
    this.init('login')
  }
}

export default (context, inject, req) => {
  inject('auth0', new Auth0Util(context, req))
}
