// server.js
//
//
//

'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const exphbs = require('express-handlebars')
const literary = require('../frontend/literary')
const publication = require('../entities/publication/publication')

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
    app.use( morgan('dev') )    // Logging
    app.use( helmet() )         //
    //app.use( express.static(__dirname + './public') )
    app.use( express.static('./frontend/public') )

    // Setting express-handlebars as view engine
    const hbs = exphbs.create({
      defaultLayout: 'main',
      extname: '.hbs',
        layoutsDir: './frontend/views/layouts'
    })
    // Register `hbs.engine` with the Express app.
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    /*
    app.set('view options', {
      defaultLayout: 'main',
		  extname: '.hbs',
		  layoutsDir: '../frontend/views/layouts'
    });
    */

    // Logging request headers
    /*
    app.use( (req, res, next) => {
    	console.log(req.headers)
    	next()
    })
    */
    app.use( (err, req, res, next) => {
      reject( new Error('Something went wrong!, err:' + err) )
      res.status(500).send('Something went wrong!')
    })

    // Add Literary frontend routes
    literary.api(app)

    // Add Publication API to express app
    publication.api(app, options)

    // Start server and return server
    const server = app.listen( options.port, () => resolve(server) )
  });
}

module.exports = {
  start: start
}
