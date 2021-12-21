import React from 'react'
import {Button, Select, Input, Checkbox} from 'antd'

export default class Formulario extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hideSelect:false,
      selectedItem:""
    }
  }

  hideSelect(e){
    if(e.target.value != ""){
      this.setState({
        hideSelect:true
      })
    }else{
      this.setState({
        selectedItem:"",
        hideSelect:false
      })
    }
    this.props.selectCategory(e.target.value)
  }

  selectCategory(value){
    console.log(value)
    this.setState({
      selectedItem:value
    })
    this.props.selectCategory(value)
  }

  render(){
    const {Option} = Select
    return(
      <div style={{margin:"10px 0px 10px 0px"}}>
        
        <div style={{marginBottom:'10px'}}>
          <p>Property name:</p>
          
          <Input placeholder="Property name" 
                onChange={(e) => this.hideSelect(e)} 
                style={{display:"inline-block"}}/>              
        </div>

        <div style={{marginBottom:'10px'}}>
          <p>Click over an element to identify the property inside the web:</p>
          <Input placeholder="xPath expression" 
                onChange={(e) => this.props.changeIdentifier(e)} 
                style={{display:"inline-block", margin: "0 auto"}}/>
        </div>
      </div>
    )
  }
}