// crear rutas para acceder desde el front end
// en este archivo se definen las tareas (crear,borrar,editar,actualizar)

const express=require ('express');
const router =express.Router(); // devuelve un objeto en el cual ingresamos las rutas

const Task = require ('../models/task');
// 1- router.get('/', (req,res) =>{  // cuando pidan la ruta inicial de la aplicacion respondo con algo (usamos el manejador de eventos de node js (req , res)  =>)
// res.send('Hello world') ; // res . api usado generalmente para que nos devuelva un json
// });
// 2 - router.get('/', (req,res) =>{
//     // Task.find(function(err,tasks){   // de esta manera quedo antiguo ya que cuando se hace la consulta a la vez damos una respuesta y es mejor que primero haga la consulta , espere y nos de una respuesta.
//     //     console.log(tasks);
//     // }) ; 
   
//     res.json({
//         status : 'API Works! '  //Obtenemos un objeto de javascript
//     });
//     });



router.get('/' , async(req,res) =>{
     const tasks = await Task.find();
     
     res.json(tasks);
});

router.get('/:id' , async(req,res) =>{
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});



router.post('/', async (req,res)=>{   // se utiliza para enviar datos 
    
    // console.log(req.body);//y los datos capturados se almacenan en req
    const {title, description} = req.body;
    const task =new Task({title , description}) ;
    // console.log(task); //capturamos lo que envia el cliente
     await task.save();
    // res.json('received'); // en vez de usar el received usamos otra respuesta 
    res.json({status:'Task Saved'})
});


router.put('/:id' , async (req,res) => {     // sirve para actualizar los datos recibidos
          const {title,description} = req.body; 
          const newTask={title,description};
          // console.log(req.params.id); // con el req.params.id almacenamos el id de la tarea
          await Task.findByIdAndUpdate(req.params.id, newTask);    
          //res.json('received');
          res.json({status:'Task Updated'});

});


router.delete('/:id' , async (req,res) => {     // sirve para actualizar los datos recibidos
    
    
    await Task.findByIdAndRemove(req.params.id);    
    //res.json('received');
    res.json({status:'Task Deleted'});

});




module.exports = router ;