/* eslint-env mocha */
const request = require('supertest')
const server = require('../server')

describe('Publications API', () => {
  let app = null
  let testPublications = [{
    'id': '3',
    'title': 'xXx: Reactivado',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 20
  }, {
    'id': '4',
    'title': 'Resident Evil: Capitulo Final',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 27
  }, {
    'id': '1',
    'title': 'Assasins Creed',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 6
  }]

  let testRepo = {
    getPublicationsAll () {
      return Promise.resolve(testPublications)
    },
    getPublicationPremiers () {
      return Promise.resolve(testPublications.filter(publication => publication.releaseYear === 2017))
    },
    getPublicationById (id) {
      return Promise.resolve(testMovies.find(publication => publication.id === id))
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all publications', (done) => {
    request(app)
      .get('/publications')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })

  it('can get publication premiers', (done) => {
    request(app)
    .get('/publications/premiers')
    .expect((res) => {
      res.body.should.containEql({
        'id': '1',
        'title': 'Assasins Creed',
        'format': 'IMAX',
        'releaseYear': 2017,
        'releaseMonth': 1,
        'releaseDay': 6
      })
    })
    .expect(200, done)
  })

  it('returns 200 for an known publication', (done) => {
    request(app)
      .get('/publication/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })
})
