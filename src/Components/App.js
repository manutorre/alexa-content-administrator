import React, { Component } from 'react';
import Entry from './Sections/Entry'
import NewsStepper from './Sections/Stepper/NewsStepper'
import Categories from './Sections/Categories'
import 'antd/dist/antd.css'
import '../App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      section:"entry",
      categories: []
    }
  }

  changeSection(section){
    this.setState({section: section})
  }

  addCategory(categoryName){
    const currentCategories = this.state.categories
    const newCategories = currentCategories.push(categoryName)
    this.setState({
      categories: newCategories
    })
  }

  render(){
    switch (this.state.section) {
      case "entry":
        return <Entry changeSection={(section) => this.changeSection(section)}/>
        break;
      case "stepper":
        return <NewsStepper changeSection={(section) => this.changeSection(section)}/>
        break;
      case "categories":
        return <Categories changeSection={(section) => this.changeSection(section)}/>
        break;
      default:
        return <Entry changeSection={(section) => this.changeSection(section)}/>
        break;
    }

  }

}

export default App;

//this.state.array[this.state.value]
