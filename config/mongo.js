const MongoClient = require('mongodb')

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options), /*{
        db: options.dbParameters(),
        server: options.serverParameters(),
        replset: options.replsetParameters(options.repl)
      },*/ (err, client) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        console.log('Database name: ' + options.db );
        const db = client.db(options.db)
        mediator.emit('db.ready', db)
        //const adminDb = db.db(options.db).admin()
        //console.log(adminDb.listDatabases());
        /*
        db.admin().authenticate(options.user, options.pass, (err, result) => {
          if (err) {
            mediator.emit('db.error', err)
          }
          mediator.emit('db.ready', db)
        })
        */
      })
  })
}

module.exports = Object.assign({}, {connect})
