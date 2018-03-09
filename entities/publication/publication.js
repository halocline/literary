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

  app.get('/publications2', (req, res, next) => {
    repo.getPublicationsAll().then(docs => {
      res.render(appRoot + '/frontend/views/layouts/publications', { publications: docs } )
    }).catch(next)
  })

  // Get publications by premiers
  app.get('/publications/premiers', (req, res, next) => {
    repo.getPublicationPremiers().then(publications => {
      res.status(status.OK).json(publications)
    })
  })

  // Get publication by id
  app.get('/publications/:id', (req, res, next) => {
    console.log(req.params)
    console.log(req.params.id)
    /*
    repo.getPublicationById(req.params.id).then(function(publication) {
      res.status(status.OK).json(publication)
    }).catch(next)
    */
    repo.getPublicationById(req.params.id).then(publication => {
      console.log(publication)
      res.render(appRoot + '/frontend/views/layouts/publication', { publication: publication } )
      //res.status(status.OK).json(publication)
    }).catch(next)
  })
}

module.exports = {
  helloWorld: publication.helloWorld,
  create: publication.create,
  api: api
}
