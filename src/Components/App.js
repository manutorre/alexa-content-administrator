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
      section:"entry",
      user:""
    }
  }

  changeSection(section){
    this.setState({section: section})
  }

  showAdmin(){
    const win = window.open("../contentAdmin/index.html", '_blank');
    //acceder con window.query("username")
    //win.username = this.state.user
    win.focus();
  }


  render(){
    switch (this.state.section) {
      case "entry":
        return <Entry showAdmin ={()=> this.showAdmin()}  changeSection={(section) => this.changeSection(section)}/>
        break;
      case "stepper":
        return <NewsStepper showAdmin ={()=> this.showAdmin()} changeSection={(section) => this.changeSection(section)}/>
        break;
      default:
        return <Entry showAdmin ={()=> this.showAdmin()} changeSection={(section) => this.changeSection(section)}/>
        break;
    }

  }

}

export default App;

//this.state.array[this.state.value]
