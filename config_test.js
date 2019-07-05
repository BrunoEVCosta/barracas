/**
 * Created by Manjesh on 14-05-2016.
 */

module.exports = {
  sql: {
    host:     'localhost', 
    database: '',
    username: '',
    password: '',
    dialect: 'mysql', // PostgreSQL, MySQL, MariaDB, SQLite and MSSQL See more: http://docs.sequelizejs.com/en/latest/
    logging: console.log,   //True starts to make it cry.
    timezone: '+05:30',
    dialectOptions: {
      socketPath: '/run/mysqld/mysqld.sock',
      supportBigNumbers: true,
      bigNumberStrings: true
    },
  },
  seedDB:false,
  seedMongoDB:false,
  seedDBForce:true,
  db:'sql', // mongo,sql if you want to use any SQL change dialect above in sql config
  seed: 'REPLACE THIS'
}

