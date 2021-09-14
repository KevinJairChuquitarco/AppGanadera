const funciones = require('./funciones');
let usuario;

const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const passport = require('passport');

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

//Métodos GET
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/inicioSesion',(req,res)=>{
    res.render('inicioSesion');
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
    console.log(req.user.Nombre_usu);
});
app.get('/registro_Bovino',(req,res)=>{
    res.render('registro_Bovino');
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
<<<<<<< HEAD

app.post('/inicioSesion',(req,res)=>{
    usuario = req.body;
    console.log(funciones.LoginUs(usuario.email, usuario.password))
    if (funciones.LoginUs(usuario.email, usuario.password)==true) {
        res.send('exito');
	} else {
		res.send('Please enter Username and Password!');
	}
});

=======
//Método POST
app.post('/inicioSesion',(req,res, next)=>{
    passport.authenticate('local.inicioSesion',{
        successRedirect: '/inicio_usuario',
        failureRedirect: '/inicioSesion'
    })(req, res, next);
});
//Listen server
>>>>>>> ae1d446ed60acd38bfd8f5e6715180ef429ac522
app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});