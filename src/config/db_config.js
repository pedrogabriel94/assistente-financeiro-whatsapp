const pg = require('knex')({
  client: 'pg',
  version: '17.2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
}).on('query', function(queryData) {
  console.log(queryData.__knexUid + ' -- ' + queryData.__knexQueryUid + '\n' + queryData.sql + '\n' + queryData.bindings);
});

module.exports = pg;