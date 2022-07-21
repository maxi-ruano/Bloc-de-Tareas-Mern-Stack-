// en models nos permite definir que tipo de dato se almacena en la base de datos

const mongoose=require ('mongoose');
const {Schema} = mongoose; // permite definir el esquema de los datos , como por ejemplo si creamos tareas , que propiedades tiene esas tareas como por ejemplo titulo , autor 

const TaskSchema =new Schema({
    title:{type:String,required:true},
    description:{type: String , required:true}
});


module.exports=mongoose.model('Task',TaskSchema)