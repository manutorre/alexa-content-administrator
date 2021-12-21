import React, { Component } from 'react';
import logo from '../../logo.svg';
import {Button, Input, Alert} from 'antd'
import axios from 'axios'

export default class CategoryWords extends Component {

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
        <Button className='buttons' onClick={() => this.props.changeSection("category")}>
          Go Back
        </Button>  
        <div className='ButtonsWrapper' style={{alignItems:'center', marginLeft:300, marginRight:300}}>

         <h2>
             Category Words
          </h2>
          
          <p style={{textAlign: 'left'}} className="App-intro">
            You can define a category manually with the next form
            
            <p style={{marginLeft: 30}}>- Category name: </p> 
            <p style={{marginLeft: 30}}>- (Optional) Sub-Category name: </p> 
          </p>
        </div>

      </div>
    );
  }
}
