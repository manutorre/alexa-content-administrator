import React from 'react'
import {Modal, Button, Select, Input} from 'antd'
import axios from 'axios'

export default class SiblingsModal extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      categories:[],
      criterios:["className","tagName"],
      hideSelect:false
    }
  }

  componentDidMount(){
    
    axios.get("https://alexa-apirest.herokuapp.com/users/categories/gonza")
    .then((response) =>{
      console.log(response.data);
      this.setState({
        categories: response.data
      });

    });
  }

  showModal(){
    this.setState({
      visible: true,
    });
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

  handleOk(e){
    console.log(e);
    this.setState({
      visible: false,      
    });

    this.props.confirmContent()
  }

  handleCancel(e){
    console.log(e);
    this.setState({
      visible: false,
      criterio:""
    });
    this.props.clearCategory()
  }


  render() {
    const Option = {Select}
    return (
      <div> 
          <Button type="primary" onClick={() => this.showModal()} style={{ width: 120, display: "block", margin: "0 auto" }}>
            Seleccionar
          </Button>
        
          <Modal
            title="Contenidos"
            visible={this.state.visible}
            onOk={(e) => this.handleOk(e)}
            onCancel={(e) => this.handleCancel(e)}
          >
          <p>Elegir criterio para selección:</p>
          <Select placeholder="Criterio" onChange={(e) => this.props.returnSiblings(e)} style={{ width: 120, display: "inline-block", margin: "0 auto" }}>
              {this.state.criterios.map( (criterio, index) => {
                return(
                  <Option 
                    key={index}   
                    value={criterio}>
                      {criterio}
                  </Option>
                )
              })}
            </Select>

        {this.props.currentStep == 3 && this.props.titleAndLinkStatus == "Confirmado" &&
          <div>
            <p>Categoria:</p>
            {this.state.categories.length > 0 && !this.state.hideSelect &&
              <Select placeholder="Categoría" onChange={(e) => this.props.selectCategory(e)} style={{ width: 120, display: "inline-block", margin: "0 auto" }}>
                {this.state.categories.map( (category, index) => {
                  return(
                    <Option 
                      key={index} 
                      selected={(this.props.selectedCategory == category).toString()} 
                      value={category.toString()}>
                        {category.toString()}
                    </Option>
                  )
                })}
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
        }
        </Modal>
      </div>
    );
  }

}
