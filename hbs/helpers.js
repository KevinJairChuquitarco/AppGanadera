const hbs = require('hbs');


var fs = require('fs');

hbs.registerHelper('getCategoriasM', function () {
    let data = fs.readFileSync('hbs/categorias.json');
    let categorias = JSON.parse(data);
    console.log(categorias);
    var ret = '';
    if(categorias != null){
        categorias.forEach(categoria => {
            ret += `<option value = "${categoria.Codigo_cat}">${categoria.Nombre_cat.trim()}</option>`;
        });
    }   
    console.log(ret); 
    return ret;
 });

