// publication/publication.js

'use strict'
const status = require('http-status')
const publication = require('./repository')

const api = (app, options) => {
  const {repo} = options

  // Get all publications
  app.get('/publications', (req, res, next) => {
    repo.getPublicationsAll().then(publications => {
      if( req.query.hasOwnProperty("format") && req.query.format === 'json') {
        res.status(status.OK).json(publications)
      }
      res.render(appRoot + '/frontend/views/layouts/publications', { publications: publications } )
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
    console.log('Query Params:')
    console.log(req.query)
    console.log('Request Params:')
    console.log(req.params)

    repo.getPublicationById(req.params.id).then(publication => {
      if( req.query.hasOwnProperty("format") && req.query.format === 'json') {
        res.status(status.OK).json(publication)
      }
      res.render(appRoot + '/frontend/views/layouts/publication', { publication: publication } )
      //res.status(status.OK).json(publication)
    }).catch(next)
  })

  app.post('/publications/:id', (req, res, next) => {
    console.log('POST Call: ')
    console.log(req.params)
    console.log(req.query)
    console.log(req.body)
    /*
    repo.updatePublication(req.params.id, req.query).then(publication => {

    }).catch(next)
    */
  })
}

module.exports = {
  helloWorld: publication.helloWorld,
  create: publication.create,
  api: api
}
