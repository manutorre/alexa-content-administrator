import React, { Component } from 'react';
import logo from '../../logo.svg';
import {Button, Input, Alert} from 'antd'
import axios from 'axios'

export default class Category extends Component {

  constructor(props){
    super(props);
    this.state={
      array:[],
      value:1,
      str:"",
      action:"",
      selected:"",
      username:"",
      logueado:false,
      errorLogin:false
    }
  }

render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{color:"white"}}>ContentParser</h1>
        </header>
          
        <Button className='buttons' onClick={() => this.props.changeSection("entry")}>
          Go Back
        </Button>        

        <div className='ButtonsWrapper' style={{alignItems:'center', marginLeft:300, marginRight:300}}>

          <h2>
             The categories are at the top level of the hierarchy
          </h2>

          <br/>
            [Hierarchy Image]
          <br/>
          <br/>

          <h2>
             You can also define sub-categories, which will be at the lower levels of the hierarchy
          </h2>

          <br/>
            [Hierarchy Image]
          <br/>
          <br/>
          
          <h3 className="App-intro">
            You can define categories manually with the next form
          </h3>
          <label for="categories">Enter some text and press enter to add a new category</label>
          <textarea style={{marginTop:20, marginBottom:20}} id="categories" name="categories" rows="4" cols="50" placeholder="Categories">
          </textarea>

          <h3 className="App-intro">
            (Optional) You can define sub-categories with the next form
          </h3>
          <label for="sub-categories">Enter some text and press enter to add a new sub-category</label>
          <textarea style={{marginTop:20, marginBottom:20}} id="sub-categories" name="sub-categories" rows="4" cols="50" placeholder="Sub-categories">
          </textarea>

          <h3 className="App-intro">
            5 - Again, is time to define which words will map with the categories/sub-categories defined before.
          </h3>

          <label for="categoryWords">Enter some text and press enter to add a new word</label>
          <textarea style={{marginTop:20, marginBottom:20}} id="categoryWords" name="categoryWords" rows="4" cols="50" placeholder="Category Words">
          </textarea>

        </div>

      </div>
    );
  }
}
