const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ; 

app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/add',(req,res)=>{
    res.render('registrarUsuario');
});

app.post('/registrarUsuario',(req,res)=>{
    console.log(req.body);
    res.send('ok');
});

app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});