const http = require('http')
const WebSocket = require('ws')
const chokidar = require('chokidar')

const server = http.createServer((req, res) => {
  res.end('Hello World')
})

const wss = new WebSocket.Server({ server })

function startWatch() {
  chokidar.watch('./src').on('change', (path) => {
    console.log(`File ${path} has been changed`)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('update')
      }
    })
  })
}

function start() {
  console.log('Starting application...')
  server.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
  startWatch()
}

start()

module.exports = {
  start,
}
