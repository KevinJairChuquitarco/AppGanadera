let sql = require("mssql");
const config = require('./config');
const funciones = {
    obtenerDatosUsuario: function(email){
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`select *from Usuario where Email_usu=\'${email}\'`, function (err, recordset) {
                
                if (err) console.log(err) 
                console.log(recordset.recordset);
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
    RegistrarCategoria: function (nombre,descripcion) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Insert into CategoriaGanado Values ('${nombre}','${descripcion}')`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Categoría Registrada con éxito '+recordset.rowsAffected);  
            });
        });
    },
    RegistrarBovino: function (codigo,nombre,fechaNac,raza,sexo,codigoUs,codigoCat) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Insert into Bovino Values ('${codigo}','${nombre}','${fechaNac}','${raza}',1,'${sexo}',${codigoUs},${codigoCat});`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Categoría Registrada con éxito '+recordset.rowsAffected);  
            });
        });
    },
    RegistrarDistribuidor: function (nombre,ruc,direccion) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Insert into Distribuidor values('${nombre}','${ruc}','${direccion}')`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Distribuidor Registrado con éxito '+recordset.rowsAffected);  
            });
        });
    },
    RegistrarPeriodo: function (fechaInicio,fechaFin,descripcion,precio) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Insert into Periodo values ('${fechaInicio}','${fechaFin}','${descripcion}',${precio})`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Periodo Registrado con éxito '+recordset.rowsAffected);  
            });
        });
    },
    RegistrarProduccionDiaria: function (fecha,litros,codigoUsu,codigoDis,codigoPer) {
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`Insert into ProduccionDiaria values ('${fecha}',${litros},${codigoUsu},${codigoDis},${codigoPer})`, function (err, recordset) {       
                if (err) console.log(err);
                else
                console.log('Produccion Diaria Registrada con éxito '+recordset.rowsAffected);  
            });
        });
    }
}
//funciones.obtenerDatosUsuario(1);
//funciones.RegistrarUsuario('Jair Velasco','2001/07/27','098765432','jairchuquitarco@mail.com','123');
module.exports = funciones;