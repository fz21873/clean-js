const { Database } = require('sqlite3');
const typeorm = require('typeorm');

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database:'db.sqlite',
  synchronize: true,
  dropSchema: true,
});

module.exports = { typeormServer };