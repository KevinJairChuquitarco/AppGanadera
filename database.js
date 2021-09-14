let sql = require("mssql");
require('rest-mssql-nodejs');
const config = require('./config');

const pool = sql.connect(config);

module.exports = pool;