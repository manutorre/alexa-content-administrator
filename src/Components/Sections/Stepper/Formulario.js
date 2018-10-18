import React from 'react'
import {Button, Select, Input} from 'antd'

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
      <div>
        <p>Categoria:</p>
        {this.props.categories.length > 0 && !this.state.hideSelect &&
          <Select value={this.state.selectedItem? this.state.selectedItem : undefined}  placeholder="Categoría" 
              onChange={(e) =>this.selectCategory(e)} style={{ width: 120, display: "inline-block", margin: "0 auto" }}>
              
              {this.props.categories.map( (category, index) => {
                return(
                    <Option 
                      key={index} 
                      selected={(this.props.selectedCategory == category).toString()} 
                      value={category.toString()}>
                        {category.toString()}
                    </Option>
                    )
                })
              }
          </Select>
        }
        
        <Input placeholder="Nueva categoria" 
              onChange={(e) => this.hideSelect(e)} 
              style={{display:"inline-block", marginTop: "10px"}}/>              
                
        <p>Identificador:</p>
        <Input placeholder="Identificador de contenido/s" 
              onChange={(e) => this.props.changeIdentifier(e)} 
              style={{display:"inline-block", margin: "0 auto"}}/>
      </div>
    )
  }
}