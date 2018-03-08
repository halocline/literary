//
//
//
//

'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const publication = require('./entities/publication/publication')

publication.helloWorld()

const start = (options) => {
  return new Promise(function(resolve, reject) {
    // Verify repository added and server port
    if(!options.repo) {
      reject( new Error('The server must be started with a connected repository') )
    }
    if(!options.port) {
      reject( new Error('The server must be started with an available port') )
    }

    // Initialize express app and middlewares
    const app = express()
    app.use( morgan('dev') )
    app.use( helmet() )
    app.use( (err, req, res, next) => {
      reject( new Error('Something went wrong!, err:' + err) )
      res.status(500).send('Something went wrong!')
    })

    // Add Publication API to express app
    publication.api(app, options)

    // Start server and return server
    const server = app.listen( options.port, () => resolve(server) )
  });
}

module.exports = {
  start: start
}
