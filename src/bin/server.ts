#!/usr/bin/env node
/* eslint-disable global-require */
import fs from 'fs'
import path from 'path'
import initialMongoDB from 'config/database'

const pathEnv = path.resolve('.env')

if (!fs.existsSync(pathEnv)) {
  throw new Error(
    'Missing env!!!\nCopy / Duplicate ".env.example" root directory to ".env"'
  )
}

/**
 * Module dependencies.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({ extensions: ['.js', '.ts'] })
const http = require('http')
const debug = require('debug')('boilerplate-express-typescript:server')

const app = require('../app')

/**
 * Initial Connection Database
 */
initialMongoDB()

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
  debug(`Listening on ${bind}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
// eslint-disable-next-line import/order
export const io = require('socket.io')(server, {
  serveClient: true,
  secure: true,
  pingTimeout: 300,
  path: '/socket',
  cors: {
    origin: '*',
  },
})

server.on('error', onError)
server.on('listening', onListening)
