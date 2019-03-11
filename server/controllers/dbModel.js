const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: 'ipostgres://localhost/scratch'
});
