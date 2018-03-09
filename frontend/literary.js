// literary.js
'use strict'

const status = require('http-status')

const api = (app) => {
  app.get('/', (req, res) => {
    res.render(__dirname + '/views/layouts/home')
  })
}

module.exports = {
  api: api
}
