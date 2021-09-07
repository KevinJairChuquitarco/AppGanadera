const {config} = require("./config");

async function Seleccionar() {
    console.log('calling');
    const result = await config.executeQuery('select *from Usuario');
    console.log(result);
}
  
  Seleccionar();
  