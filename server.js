const funciones = require('./funciones');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

const port = process.env.PORT || 3000 ; 

app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');
app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/registrarUsuario',(req,res)=>{
    res.render('registrarUsuario');
});

app.post('/registrarUsuario',(req,res)=>{
    let datos = req.body;
    funciones.RegistrarUsuario(datos.nombre,'2000/12/01',datos.telefono,datos.email,datos.password);
    res.send("Listo");
});

app.get('/inicioSesion',(req,res)=>{
    res.render('inicioSesion');
});

app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});