const funciones = require('./funciones');
function registrar(){
    let nombre =document.getElementById("nombre").value;
    let fechaNac =new Date (document.getElementById("fechaNac").value);
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("inputPassword6").value;
    let fechaNacFormat=fechaNac.getFullYear()+"/"+fechaNac.getMonth()+"/"+fechaNac.getDay();
    try {
        //funciones.RegistrarUsuario(nombre,fechaNacFormat,telefono,email,password);
        funciones.RegistrarUsuario('Jair Velasco','2001/07/27','098765432','jairchuquitarco@mail.com','123');
        alert("Registrado con éxito");
    } catch (error) {
        console.log(error)
        alert(nombre+"  "+fechaNacFormat+"  "+telefono+email+password+'No registrado');
    }   
}