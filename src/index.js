//con este archivo inicializamos el servidor node js
const morgan =require('morgan');
const express = require ('express');
const path =require ('path'); // se encarga de unir directorios y  ver si nuestro codigo es de un servidor windows o linux
const app = express(); //obtengo un objeto y lo guardo en la constane app
const { mongoose} =require ('./database'); // te conectas a la base de datos
//Settings

app.set('port', process.env.PORT  || 3000); // te toma el puerto del servicio que esta dando la nube. 


//Middlewares // Funciones que se ejecutan antes que lleguen a nuestras rutas .

app.use(morgan('dev'));
app.use(express.json()); // esto comprueba de que el dato que llega al servidor  sea un json


//Routes
app.use('/api/tasks',require('./routes/task.routes'));



//Static files 
// console.log(__dirname + '/public') // esta constante viene por defecto y te indica donde esta guardado el archivo
// // app.use(express.static());
// console.log(path.join(__dirname, 'public')); // esta constante viene por defecto y te indica donde esta guardado el archivo
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server 
app.listen(app.get('port'), () =>{
console.log(`Server on port ${app.get('port')}`); // (por consola nos muestra Cannot-get , que quiere decir que express funciona)
});