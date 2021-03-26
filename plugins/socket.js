// import socket from 'socket.io-client'

export default ({ app, route, store, req }, inject) => {
  const io = {}
  const socketHost = 'localhost:8080'
  io.socket = new WebSocket(`ws://${socketHost}/ws`)

  // io.socket = await socket(socketHost, {
  //   path: '/ws',
  //   reconnect: true,
  //   transports: ['websocket'],
  // })

  io.addEventListener = (cb) => {
    io.socket.addEventListener('message', (data) => {
      cb(data)
    })
  }

  inject('io', io)
}
