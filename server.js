const funciones = require('./funciones');
let usuario;

const express = require('express');
const app = express();
const hbs = require('hbs');

//Recuperar datos
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));
//Puerto
const port = process.env.PORT || 3000 ; 

//Express HBS view engine
app.set('view engine', 'hbs');
//Donde cargar los archivos estaticos
app.use(express.static(__dirname + '/public'));
//Parciales
hbs.registerPartials(__dirname+'/views/partials');

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/inicioSesion',(req,res)=>{
    res.render('inicioSesion');
});

app.get('/registrarUsuario',(req,res)=>{
    res.render('registrarUsuario');
});

app.post('/registrarUsuario',(req,res)=>{
    let datos = req.body;
    funciones.RegistrarUsuario(datos.nombre,datos.fechaNacimiento,datos.telefono,datos.email,datos.password);
    res.send("Listo");
});

app.get('/inicio_usuario',(req,res)=>{
    res.render('inicio_usuario');
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

app.post('/inicioSesion',(req,res)=>{
    usuario = req.body;
    console.log(funciones.LoginUs(usuario.email, usuario.password))
    if (funciones.LoginUs(usuario.email, usuario.password)==true) {
        res.send('exito');
	} else {
		res.send('Please enter Username and Password!');
	}
});

app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});