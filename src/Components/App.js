import React, { Component } from 'react';
import Entry from './Sections/Entry'
import NewsStepper from './Sections/Stepper/NewsStepper'
import 'antd/dist/antd.css'
import '../App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      section:"entry"
    }
  }

  changeSection(section){
    this.setState({section: section})
  }

  render(){
    switch (this.state.section) {
      case "entry":
        return <Entry changeSection={(section) => this.changeSection(section)}/>
        break;
      case "stepper":
        return <NewsStepper changeSection={(section) => this.changeSection(section)}/>
        break;
      default:
        return <Entry changeSection={(section) => this.changeSection(section)}/>
        break;
    }

  }

}

export default App;

//this.state.array[this.state.value]
