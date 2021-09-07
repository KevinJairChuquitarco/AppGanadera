
const config = new (require('rest-mssql-nodejs'))({
    user: 'sa',
    password: '27072000',
    server: 'localhost', // replace this with your IP Server
    database: 'AppGanadera',
    port: 1433, // this is optional, by default takes the port 1433
    options: { 
        encrypt: true // this is optional, by default is false
    } 
});
module.exports = {config};