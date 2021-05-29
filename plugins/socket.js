class Socket {
  constructor({ store }) {
    this.socketHost = process.env.socketHost
    this.socket = null
    this.store = store
  }

  connect() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => this.onFailedAuth(reject), 5000)
      this.socket = new WebSocket(`ws://${this.socketHost}/ws`)
      this.socket.onerror = console.error
      this.socket.onopen = this.authenticate.bind(this)
      this.onMessage((data) => {
        data.authenticated
          ? this.onSuccessfulAuth(resolve, timeout)
          : this.onFailedAuth(reject)
      })
    })
  }

  send(message) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message))
    } else throw new Error('Socket not connected')
  }

  onMessage(cb) {
    if (this.socket) {
      this.socket.addEventListener('message', ({ data }) => {
        cb(JSON.parse(data))
      })
    } else throw new Error('Socket not connected')
  }

  authenticate() {
    this.send({
      type: 'Authenticate',
      accessToken: this.store.state.accessToken,
    })
  }

  onSuccessfulAuth(resolve, timeout) {
    clearTimeout(timeout)
    resolve()
  }

  onFailedAuth(reject) {
    this.socket = null
    reject(new Error("Couldn't establish Ws Connection"))
  }
}

export default ({ app, route, store, req }, inject) => {
  inject('socket', new Socket({ store }))
}
