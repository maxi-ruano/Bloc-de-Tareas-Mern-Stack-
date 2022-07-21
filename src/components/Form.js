import React,{Component} from "react";
export default class Form extends Component{

    constructor(){
        super(); // hereda todas las funcionalidades del componente
        this.state= {
            title:'',
            description:''
        };
        this.handleChange =this.handleChange.bind(this);
        this.addTask =this.addTask.bind(this);
        
    }

addTask(e){
              console.log(this.state);
            fetch('api/tasks',{
                method: 'post',
                body:JSON.stringify(this.state),
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json'
                }
            })
            .then(res => console.log(res))
            .catch(err => console.error(err));
              e.preventDefault();
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
                       <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title"/>
 
                     </div>
 
                   </div>
                   <div className='row'>
                     <div className='input-field col s12'>
                      <textarea name="description" onChange={this.handleChange} className='materialize-textarea' placeholder='Task Description'></textarea>
 
                     </div>
 
                   </div>
                   <button type='submit' className='btn light-blue darken-4'>
                     Send
                   </button>
                 </form>
 
                </div>
                </div>
               </div>
            <div className='col s7'>
 
             </div>
            </div>
         </div> 
        );
    }
}