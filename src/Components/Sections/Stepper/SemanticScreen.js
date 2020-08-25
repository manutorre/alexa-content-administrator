import React from 'react';
import { Button, Spin, Alert } from 'antd';
import Stepper from './Stepper';
import axios from 'axios';
import SemanticForm from './SemanticForm';

export default class SemanticScreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      types:[],
      confirmedContent: {},
      selectedType: "",
      identifier:"",
      loading:false,
      done: false,
      errorMessage:null,
      navegable:false
    }
  }



  render(){
    if (this.state.errorMessage || this.state.done) {
      return(
        <div>
          <div>
            {this.state.errorMessage ? 
                <Alert
                  message="Error"
                  description= {this.state.errorMessage}
                  type="error"
                  showIcon
                />
            : <Alert
                    message="Success"
                    description="El contenido fue añadido correctamente"
                    type="success"
                    showIcon
                  /> 
            }
          </div>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.showAdmin()}>
            Administrar contenidos
          </Button>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
            Atras
          </Button>          
        </div>
      )
    }
    else{
      return(
        <div style={{
          width:"210px",
          margin:"20px auto",  
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {this.state.loading && 
            <div className="example-stepper">
              <Spin className="diagram-spin" size="large"/>
            </div>        
          }
          
          <SemanticForm
            selectType={(value) => this.selectType(value)}
            types={this.state.types}
            selectedtype = {this.props.selectedType}
            changeIdentifier = {(e) => this.props.changeIdentifier(e)}
            setNavegable = {(e) => this.props.setNavegable(e)}
          />

          <div style={{
            display:'flex', 
            flexDirection:'column',
            alignItems:'flex-end'
          }} >
            <Button onClick={() => this.confirm()} style={{display:"inline-block", margin: "5px"}}>
              Add a new property
            </Button>
            
            <Button onClick={() => this.confirm()} type="primary" style={{display:"inline-block", margin: "5px"}}>
              Confirm type of content
            </Button>

            <Button type="danger" style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
              Back
            </Button>
          </div>
        </div>
      )
    }
  }

}
