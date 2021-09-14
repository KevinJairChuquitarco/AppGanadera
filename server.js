const funciones = require('./funciones');

let sql = require("mssql");
const config = require('./config');

const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const passport = require('passport');
const { doesNotMatch } = require('assert');

//Inicializaciones
const app = express();
require('./passport');
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'mysecretkey-proyect23567',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('static'));
app.use(passport.initialize());
app.use(passport.session());
//Variable Globales
app.use((req, res, next)=>{
    app.locals.user = req.user;    
    next();
})

//Puerto
const port = process.env.PORT || 3000 ; 

//Express HBS view engine
app.set('view engine', 'hbs');
//Donde cargar los archivos estaticos
app.use(express.static(__dirname + '/public'));
//Parciales
hbs.registerPartials(__dirname+'/views/partials');
//Llamar al archivo de helpers
require('./hbs/helpers');

//Métodos GET
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/inicioSesion',(req,res)=>{
    res.render('inicioSesion');
});
app.post('/inicioSesion',(req,res, next)=>{
    passport.authenticate('local.inicioSesion',{
        successRedirect: '/inicio_usuario',
        failureRedirect: '/inicioSesion'
    })(req, res, next);
});

app.get('/registrarUsuario',(req,res)=>{
    res.render('registrarUsuario');
});

app.post('/registrarUsuario', async(req,res)=>{
    let datos = req.body;
    funciones.RegistrarUsuario(datos.nombre,'2000/12/01',datos.telefono,datos.email,datos.password);
    res.redirect('/inicio_usuario');
});

app.get('/inicio_usuario',(req,res)=>{
    res.render('inicio_usuario');    
});
app.get('/registro_Bovino',(req,res)=>{
    var fs = require('fs');
    const getCategoriasBD = async()=>{
        let conexion = await sql.connect(config);
        const usuario = app.locals.user;
      //  console.log(usuario.Codigo_usu);
        const result =  await conexion.request().query("Select cg.Nombre_cat, cg.Codigo_cat, cg.Descripcion_cat from CategoriaGanado cg INNER JOIN Bovino bv ON bv.Codigo_usu = "+ usuario.Codigo_usu+" and cg.Codigo_cat = bv.Codigo_cat");
      // Select cg.Nombre_cat, cg.Codigo_cat, cg.Descripcion_cat from CategoriaGanado cg INNER JOIN Bovino bv ON bv.Codigo_usu ='3' and cg.Codigo_cat = bv.Codigo_cat;
        const categorias = result.recordset;
        return categorias;
    }
    getCategoriasBD().then(categorias => {
        console.log(categorias);
        var categoriasstring = JSON.stringify(categorias);
        fs.writeFile("hbs/categorias.json", categoriasstring, function (err) {
            if(err) console.log('error', err);
            else console.log('Archivo guardado');
        });
        
        res.render('registro_Bovino');
    })  
});
app.post('/registro_Bovino',(req,res)=>{
    let bovino = req.body;
    let bovinoDB;
    async function getDatos(codigo) {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`select *from Bovino where Codigo_bov=\'${codigo}\'`)
        bovinoDB = salida.recordset[0];
    }
    getDatos(bovino.codigo);
    setTimeout(() => { 
        if(bovinoDB == undefined){
           // funciones.RegistrarBovino(bovino.codigo,bovino.nombre,bovino.fechaNac,'Holstein',bovino.sexo,req.user.Codigo_usu,bovino.categoria);
            console.log('Registrado con éxito');
            res.render('inicio_usuario');
        }else{
            console.log('Error, ya existe ese bovino')
            res.render('registro_Bovino');
        }
    }, 1000);
});


app.get('/registro_Categoria',(req,res)=>{
    res.render('registro_Categoria');
});


app.get('/registro_Distribuidor',(req,res)=>{
    res.render('registro_Distribuidor');
});
app.get('/registro_LecheDiario',(req,res)=>{
    res.render('registro_LecheDiario');
});
app.get('/registro_Periodo',(req,res)=>{
    res.render('registro_Periodo');
});
app.get('/informe_Leche',(req,res)=>{
    res.render('informe_Leche');
});
//Método POST
//Listen server
app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});