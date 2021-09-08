let sql = require("mssql");
const config = require('./config');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
   
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Usuario', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            console.log(recordset.recordset);  
        });
    });
});

app.listen(5000, function () {
    console.log('Server is running..');
});