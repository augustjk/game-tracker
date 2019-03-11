const { Pool } = require('pg');
const KEYS = require('../constants/keys');

module.exports = new Pool({
  connectionString: KEYS.PG_URI
});
