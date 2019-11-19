const  Sequelize = require('Sequelize');
const config  =  require('./config'); 

// const pool = new Pool({
//   user: config.database.user,
//   host: config.database.host,
//   database: config.database.db,
//   password: config.database.pwd,
//   port: config.database.port,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//     user: config.database.user,
//     host: config.database.host,
//     database: config.database.db,
//     password: config.database.pwd,
//     port: config.database.port,
// })

const client = new Sequelize(config.database.db, config.database.user,config.database.pwd,
                        {host: config.database.host,
                         dialect: 'mysql'
                        })

// // client.connect()
// client.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack)
//   } else {
//     console.log('Successfully connected to the database using pg.module')
//   }
// })

client.authenticate()
                .then(() =>{ console.log(`Successfully connected to the database using sequelize module`)})
                .catch((err) =>{ console.log(`connection error`, err.stack)
})

module.exports = {client}