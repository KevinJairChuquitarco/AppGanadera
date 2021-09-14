const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const conexion = require('./database');

passport.use('local.inicioSesion', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const result = (await conexion).request().query(`Select *from Usuario where Email_usu = '${email}'`);
    if((await result).recordset.length > 0) {
        
        const user = (await result).recordset[0];
        const passBD = user.Password_usu.trim();
        if((passBD === password )){
            console.log("Login correcto");   
            done(null, user);   
        }else{
            console.log("Password Incorrectas");
            done(null, false); 
        } 
    }  
    else{
        console.log("El usuario no existe");
        done(null, false); 
    }       
}
));

//Serializar
passport.serializeUser((user, done) =>{
    console.log('Usuario serializado');
    done(null, user.Email_usu);
});

passport.deserializeUser(async (id,done)=>{
    const rows = (await conexion).request().query(`Select *from Usuario where Email_usu = '${id}'`);   
    console.log('Usuario de-serializado');
    done(null, (await rows).recordset[0]);
});