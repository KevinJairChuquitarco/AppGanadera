let sql = require("mssql");
const config = require('./config');
let arreglo;
const funciones = {
    obtenerDatosUsuario: function(email){
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`select *from Usuario where Email_usu=\'${email}\'`, function (err, recordset) {
                
                if (err) console.log(err)
                arreglo=recordset.recordset; 
                console.log(arreglo);
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