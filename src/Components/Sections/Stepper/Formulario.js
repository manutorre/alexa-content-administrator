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
          <p>Categoria:</p>
          {this.props.categories.length > 0 && !this.state.hideSelect &&
            <Select value={this.state.selectedItem? this.state.selectedItem : undefined}  placeholder="Categoria" 
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
                style={{display:"inline-block"}}/>              
        </div>

        <div style={{marginBottom:'10px'}}>
          <p>Identificador:</p>
          <Input placeholder="Identificador de contenidos" 
                onChange={(e) => this.props.changeIdentifier(e)} 
                style={{display:"inline-block", margin: "0 auto"}}/>
        </div>
        
        <div>
          <Checkbox onChange={(e)=>this.props.setNavegable(e)}>
            Definir como contenido navegable?
          </Checkbox>
        </div>
      </div>
    )
  }
}