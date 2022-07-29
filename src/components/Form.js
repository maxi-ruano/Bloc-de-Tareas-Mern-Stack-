import React,{Component} from "react";

import toast, { Toaster } from 'react-hot-toast';


export default class Form extends Component{

    constructor(){
        super(); // hereda todas las funcionalidades del componente
        this.state= {
            title:'',
            description:'',
            tasks:[],
            _id:''
        };
        this.handleChange =this.handleChange.bind(this);
        this.addTask =this.addTask.bind(this);
        
    }

addTask(e){
         if (this.state._id){
fetch(`/api/tasks/${this.state._id}`,{
  method:'PUT',
  body : JSON.stringify(this.state),
  headers:{
    'Content-Type' : 'application/json',
    'Accept' : 'application/json'
  }
  })
.then(res => res.json())
.then(data => {
  console.log (data);
  M.toast({html:'task Updated'});    
      this.setState({title:'', description:'', _id:''})  ;
      this.fetchTasks();
});
         }else{
         
          fetch('api/tasks',{
              method: 'post',
              body:JSON.stringify(this.state),
              headers:{
                  'Content-Type' : 'application/json',
                  'Accept' : 'application/json'
              }
          })
          .then(res => res.json())
          // .then(res => console.log(res))
          .then(data => {
              console.log(data)
              // M.toast({html:'task saved'});
              this.setState({title: '' , description: ''});
               this.fetchTasks();
          })
         
        .catch(err => console.error(err));
        
         }
              e.preventDefault();
         }
            componentDidMount(){
             this.fetchTasks();
            //  console.log('componente fue montado')
            } 
              fetchTasks(){
                fetch('/api/tasks')
                   .then(res => res.json())
                   .then(data => {
                    
                    this.setState({tasks: data});
                    console.log(this.state.tasks);
                   });

              }

              deleteTask(id){

              if (confirm('esta seguro que quiere borrar esta tarea?')){
                fetch('/api/tasks/' + id , {
                  method:'DELETE',
                  headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  }})
                   .then(res => res.json())
                   .then(data => {
                    console.log (data);
                    M.toast({html:'task delete'});    
                        this.fetchTasks()  ;
                  });
              }

                }

                editTask(id){

                  fetch('/api/tasks/' + id   )
                     .then(res => res.json())
                     .then(data => {
                      console.log(data)
                      this.setState({
                        title:data.title,
                        description:data.description,
                        _id:data._id
                      })
                     });
                     
                        
 
                }


         handleChange(e){
            // console.log(e.target.value);
            const {name,value} = e.target;
             this.setState({
                [name]:value
             });
            
         }


    render(){
        return(
            <div className='container'>
            <div className='row'>
           <div className='col s5'>
                <div className='card'>
                <div className='card-content'>
                 
                 <form onSubmit={this.addTask}>
                   <div className='row'>
                     <div className='input-field col s12'>
                       <input value={this.state.title} name="title" onChange={this.handleChange} type="text" placeholder="Titulo"/>
 
                     </div>
 
                   </div>
                   <div className='row'>
                     <div className='input-field col s12'>
                      <textarea name="description" onChange={this.handleChange} className='materialize-textarea' placeholder='Descripcion' value={this.state.description}></textarea>
 
                     </div>
 
                   </div>
                   <button onClick={()=> toast.success('Task Saved')} type='submit' className='btn light-blue darken-4'>
                     Enviar
                   </button>
                   <Toaster
                   
                   position="top-center"
                   reverseOrder={false}
                   
                   toastOptions={{
                    
                    duration: 5000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                
                    // Default options for specific types
                    success: {
                      duration: 3000,
                      theme: {
                        primary: 'green',
                        secondary: 'black',
                      },
                    },
                  }}
                   
                   />
                 </form>
 
                </div>
                </div>
               </div>
            <div className='col s7'>
                         <table>
                          <thead>
                 <tr>
                 <th>Titulo</th>
                 <th>Descripcion</th>
                  </tr>
                          </thead>
                          <tbody>
                              {
                                this.state.tasks.map(task =>{
                                  return (

                                    <tr key={task._id}>

                                      <td>{task.title}</td>
                                      
                                       <td>{task.description}</td>
                                       <td>
                                        <button className="btn light-blue darken-4" onClick={()=>
                                          
                                          this.deleteTask(task._id) }  >
                                          <i className="material-icons">delete</i>
                                        </button >
                                        <br></br>  <br></br>
                                        <button className="btn light-black " onClick={()=>
                                          this.editTask(task._id)}>
                                          <i className="material-icons">edit</i>
                                        </button>
                                       </td>
                                    </tr>
                                  )
                                })
                              }

                          </tbody>
                          
                          </table> 
             </div>
            </div>
         </div> 
        );
    }
}