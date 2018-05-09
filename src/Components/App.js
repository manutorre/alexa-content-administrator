import React, { Component } from 'react';
import Entry from './Sections/Entry'
import NewsStepper from './Sections/Stepper/NewsStepper'
import ContentAdmin from './Sections/ContentAdmin/ContentAdmin'
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
    console.log(window.location.href)
    if (window.location.href == "http://localhost:3000/admin") {
      return <ContentAdmin/>
    }
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
