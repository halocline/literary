// publication/publication.js

'use strict'
const status = require('http-status')
const publication = require('./repository')

const api = (app, options) => {
  const {repo} = options

  // Get all publications
  app.get('/publications', (req, res, next) => {
    repo.getPublicationsAll().then(publications => {
      res.status(status.OK).json(publications)
    }).catch(next)
  })

  // Get publications by premiers
  app.get('/publications/premiers', (req, res, next) => {
    repo.getPublicationPremiers().then(publications => {
      res.status(status.OK).json(publications)
    })
  })

  // Get publication by id
  app.get('/publications/:id', function(req, res, next) {
    repo.getPublicationById(req.params.id).then(function(publication) {
      res.status(status.OK).json(publication)
    }).catch(next)
  })
}

module.exports = {
  helloWorld: publication.helloWorld,
  create: publication.create,
  api: api
}
