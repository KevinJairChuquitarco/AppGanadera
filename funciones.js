const { text } = require("express");
let sql = require("mssql");
require('rest-mssql-nodejs');
const config = require('./config');
let arreglo;
const funciones = {
    obtenerDatosUsuario: function(email, pass){
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Select Email_usu, Password_usu from Usuario where Email_usu='${email}'`, async (err, results) => {
                if(results.recordset.length != 0){
                    let passBD = results.recordset[0].Password_usu;
                    if(results.recordset.length == 0 || !(passBD.trim() === pass )){
                        console.log("Usuario Y/O password Incorrectas");
                    }else{
                        console.log("Login correcto");
                    }                    
                }                
            });
            
        });
    },
    RegistrarUsuario : function (nombre,fechaNac,telefono,email,password) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`insert into Usuario values ('${nombre}','${fechaNac}','${telefono}','${email}','${password}');`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Usuario Registrado con éxito '+recordset.rowsAffected);  
            });
        });
    },
    LoginUs: function (email,id) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`select *from Usuario where Email_usu=\'${email}\' and Password_usu=${id}`, function(error, results, fields) {
                if (results) {
                    return true;
                } else {
                    return false;
                }			
            });
        });
    }
}
//funciones.obtenerDatosUsuario(1);
//funciones.RegistrarUsuario('Jair Velasco','2001/07/27','098765432','jairchuquitarco@mail.com','123');
module.exports = funciones;