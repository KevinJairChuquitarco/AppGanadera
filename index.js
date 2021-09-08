const express = require('express');
const app = express();

const port = process.env.PORT || 3000 ; 

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/gui'));

app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(port,()=>{
    console.log(`Escuchando el puerto ${port}`);
});