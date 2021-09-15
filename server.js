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

app.post('/registrarUsuario', async(req,res,next)=>{
    let datos = req.body;
    let datosDB;
    async function getDatos(email) {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`select *from Usuario where Email_usu=\'${email}\'`)
        datosDB = salida.recordset[0];
    }
    getDatos(datos.email);
    setTimeout(() => { 
        if(datosDB == undefined){
            funciones.RegistrarUsuario(datos.nombre,datos.fechaNacimiento,datos.telefono,datos.email,datos.password);
            
            setTimeout(() => {
                passport.authenticate('local.inicioSesion',{
                    successRedirect: '/inicio_usuario',
                    failureRedirect: '/inicioSesion'
                })(req, res, next);
            }, 1000);
            //console.log('Registrado con éxito');
            //res.redirect('/inicio_usuario');
        }else{
            console.log('Error, ya existe ese usuario')
            res.render('registrarUsuario');
        }
    }, 1000);
});

app.get('/inicio_usuario',(req,res)=>{
    res.render('inicio_usuario');    
});
app.get('/registro_Bovino',(req,res)=>{
    let categoriaDB;
    const usuario = app.locals.user;
    async function getDatos() {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`select distinct CategoriaGanado.Codigo_cat,CategoriaGanado.Nombre_cat from CategoriaGanado,Bovino where Bovino.Codigo_usu =${usuario.Codigo_usu}`);
        categoriaDB = salida.recordset;
    }
    getDatos();
    setTimeout(() => {
        console.log(categoriaDB)
        res.render('registro_Bovino',categoriaDB);
    }, 1000);
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
            funciones.RegistrarBovino(bovino.codigo,bovino.nombre,bovino.fechaNac,'Holstein',bovino.sexo,req.user.Codigo_usu,bovino.categoria);
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
app.post('/registro_Categoria',(req,res)=>{
    let categoria = req.body; 
    funciones.RegistrarCategoria(categoria.nombre,categoria.descripcion);
    res.render('inicio_usuario');
});

app.get('/registro_Distribuidor',(req,res)=>{
    res.render('registro_Distribuidor');
});
app.post('/registro_Distribuidor',(req,res)=>{
    let distribuidor = req.body;
    let distribuidorDB;
    async function getDatos(ruc) {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`select *from Distribuidor where RUC_dis =\'${ruc}\'`)
        distribuidorDB = salida.recordset[0];
    }
    getDatos(distribuidor.ruc);
    setTimeout(() => { 
        if(distribuidorDB == undefined){
            funciones.RegistrarDistribuidor(distribuidor.nombre,distribuidor.ruc,distribuidor.direccion);
            console.log('Registrado con éxito');
            res.render('inicio_usuario');
        }else{
            console.log('Error, ya existe ese ruc, Verifique datos de distribuidor')
            res.render('registro_Distribuidor');
        }
    }, 1000);
});

app.get('/registro_Periodo',(req,res)=>{
    res.render('registro_Periodo');
});
app.post('/registro_Periodo',(req,res)=>{
    let periodo = req.body;
    let periodoDB;
    async function getDatos(fechaInicio) {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`Select *from Periodo where FechaInicio_per =\'${fechaInicio}\'`)
        periodoDB = salida.recordset[0];
    }
    getDatos(periodo.fechaInicio);
    setTimeout(() => { 
        if(periodoDB == undefined){
            funciones.RegistrarPeriodo(periodo.fechaInicio,periodo.fechaFin,periodo.descripcion,periodo.precio);
            console.log('Registrado con éxito');
            res.render('inicio_usuario');
        }else{
            console.log('Error, ya existe periodo')
            res.render('registro_Periodo');
        }
    }, 1000);
});

app.get('/registro_LecheDiario',(req,res)=>{
    let distribuidorDB;
    let periodoDB;
    const usuario = app.locals.user;
    async function getDatos() {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`select distinct Distribuidor.Codigo_dis, Distribuidor.Nombre_dis from Distribuidor,ProduccionDiaria where ProduccionDiaria.Codigo_usu =${usuario.Codigo_usu}`);
        let salidaP =await pool.request().query(`select distinct Periodo.Codigo_per, Periodo.FechaInicio_per, Periodo.FechaFin_per from Periodo,ProduccionDiaria where ProduccionDiaria.Codigo_usu =${usuario.Codigo_usu}`);
        distribuidorDB = salida.recordset;
        periodoDB = salidaP.recordset;
    }
    getDatos();
    setTimeout(() => {
        let datos = distribuidorDB.concat(periodoDB);
        console.log(datos)
        res.render('registro_LecheDiario',datos);
    }, 1000);
});
app.post('/registro_LecheDiario',(req,res)=>{ 
    let datos = req.body;
    console.log(datos)
    const usuario = app.locals.user;
    funciones.RegistrarProduccionDiaria(datos.fecha,datos.litros,usuario.Codigo_usu,datos.distribuidor,datos.periodo)
    res.render('inicio_usuario');
});

app.get('/informe_Leche',(req,res)=>{
    let periodoDB;
    const usuario = app.locals.user;
    async function getDatos() {
        let pool = await sql.connect(config);
        let salidaP =await pool.request().query(`select distinct Periodo.Codigo_per, Periodo.FechaInicio_per, Periodo.FechaFin_per from Periodo,ProduccionDiaria where ProduccionDiaria.Codigo_usu =${usuario.Codigo_usu}`);
        periodoDB = salidaP.recordset;
    }
    getDatos();
    setTimeout(() => {
        console.log(periodoDB)
        res.render('informe_Leche',periodoDB);
    }, 1000);
});

app.post('/informe_Leche',(req,res)=>{
    let informe= req.body;
    let informeDB;
    let periodoDB;
    const usuario = app.locals.user;
    async function getDatos() {
        let pool = await sql.connect(config);
        let salida =await pool.request().query(`Select dis.Nombre_dis, sum(prd.CantidadLitros_prd) as Total_litros, per.PrecioLeche_per ,sum(prd.CantidadLitros_prd)* per.PrecioLeche_per as Total_dolares from ProduccionDiaria prd,Periodo per, Distribuidor dis where prd.Codigo_per=${informe.codigoPeriodo} and prd.Codigo_per=per.Codigo_per and prd.Codigo_dis =dis.Codigo_dis group by dis.Nombre_dis, per.PrecioLeche_per;`);
        let salidaP =await pool.request().query(`Select distinct Periodo.Codigo_per, Periodo.FechaInicio_per, Periodo.FechaFin_per from Periodo,ProduccionDiaria where ProduccionDiaria.Codigo_usu =${usuario.Codigo_usu}`);
        informeDB = salida.recordset;
        periodoDB = salidaP.recordset;
    }
    getDatos();
    setTimeout(() => {
        let datos = informeDB.concat(periodoDB);
        console.log(informeDB)
        res.render('informe_Leche',datos);
    }, 1000);
});
//Método POST
//Listen server
app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});