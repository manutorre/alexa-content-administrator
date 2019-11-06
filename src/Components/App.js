import React, { Component } from 'react';
import Entry from './Sections/Entry'
import NewsStepper from './Sections/Stepper/NewsStepper'
import 'antd/dist/antd.css'
import '../App.css';
import axios from 'axios'


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      section:"entry"
    }
  }

  changeUser = (e) => {
    console.log("Username ",e.target.value)
    this.setState({
      user:e.target.value
    })
  }

  registro(){
    axios.post("https://alexa-apirest.herokuapp.com/users/newUser",{name:this.state.user})
    .then((response) =>{
      console.log(response);
      //Almacenar el nombre en la sesion
      //window.parent.postMessage({"mge":"username","payload":this.state.name}, "*")
    }).catch((e) => {
      //Manejar el error
    })
  }

  changeSection(section){
    this.setState({section: section})
  }

  showAdmin(){
    const win = window.open("../contentAdmin/index.html?username="+this.state.user, '_blank');
    //acceder con window.query("username")
    win.username = this.state.user
    win.focus();
  }


  render(){
    switch (this.state.section) {
      case "entry":
        return <Entry showAdmin ={()=> this.showAdmin()} registro={()=> this.registro()} changeUser={(e)=> this.changeUser(e)} changeSection={(section) => this.changeSection(section)}/>
        break;
      case "stepper":
        return <NewsStepper showAdmin ={()=> this.showAdmin()} changeSection={(section) => this.changeSection(section)}/>
        break;
      default:
        return <Entry showAdmin ={()=> this.showAdmin()} registro={()=> this.registro()} changeUser={(e)=> this.changeUser(e)} changeSection={(section) => this.changeSection(section)}/>
        break;
    }

  }

}

export default App;

//this.state.array[this.state.value]
