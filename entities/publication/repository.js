// publication/repository.js

'use strict'

const create = () => {

}

const helloWorld = () => {
  console.log('Hello World!');
}

const repository = (db) => {
  const collection = db.collection('publications')

  const getPublicationsAll = () => {
    return new Promise( (resolve, reject) => {
      const publications = []
      const cursor = collection.find({}, {title: 1, id: 1})
      const addPublication = (publication) => {
        publications.push(publication)
      }
      const sendPublications = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all publications, err:' + err))
        }
        resolve(publications.slice())
      }
      cursor.forEach(addPublication, sendPublications)
    })
  }

  const getPublicationPremiers = () => {
    return new Promise( (resolve, reject) => {
      const publications = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addPublication = (publication) => {
        publications.push(publication)
      }
      const sendPublications = (err) => {
        if(err) {
          reject( new Error('An error occured fetching all publications, err:' + err) )
        }
        resolve(publications)
      }
      cursor.forEach(addPublication, sendPublications)
    })
  }

  const getPublicationById = (id) => {
    return new Promise( (resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendPublication = (err, publication) => {
        if(err) {
          reject( new Error(`An error occured fetching a publication with id: ${id}, err: ${err}`) )
        }
        resolve(publication)
      }
      collection.findOne({id: id}, projection, sendPublication)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getPublicationsAll,
    getPublicationPremiers,
    getPublicationById,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if(!connection) {
      reject( new Error('connection db not supplied!') )
    }
    resolve( repository(connection) )
  })
}

module.exports = {
  create: create,
  helloWorld: helloWorld,
  connect: connect
}
