const Pool = require('pg').Pool
const credentials = require('./config.txt');

// console.log(dbcreds);
// console.log(JSON.parse(dbcreds));
const client = new Pool({
    user: credentials.user,
    host: credentials.host,
    database: credentials.database,
    password: credentials.password,
    port : credentials.port,
});
// const client = new Pool(dbcreds);
module.exports = client;