import React from 'react'
import { Button, Spin } from 'antd';
import Stepper from './Stepper'
import axios from 'axios'

export default class NewsStepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showSteps: false,
      currentStep: 1,
      confirmedContent: {},
      selectedCategory: "",
      identifier:"",
      loading:false,
      done: false
    }
  }

  changeIdentifier(e){
    this.setState({
      identifier: e.target.value
    })
  }

  nextStep(){
    this.setState({currentStep: this.state.currentStep + 1})
  }

  nextTwoSteps(){
    this.setState({currentStep: this.state.currentStep + 2})
  }

  previousStep(){
    this.setState({currentStep: this.state.currentStep -1})
  }

  selectCategory(categoria){
    console.log(categoria)
    this.setState({
      selectedCategory: categoria
    })
  }

  confirmContent(content){
    this.setState({
      confirmedContent:Object.assign(this.state.confirmedContent, content)
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  confirm(){
    this.setState({loading:true})
    console.log(this.state)
    axios.put('https://alexa-apirest.herokuapp.com/users/addContent/user/gonza',{
      url:this.state.confirmedContent.link.url,
      xpath:this.state.confirmedContent.title.xpath,
      category:this.state.selectedCategory,
      state:"new",
      idContent:this.state.identifier
    }).then(() => this.setState({
      loading:false,
      done: true
    }))
  }

  showAdmin(){
    const win = window.open("http://localhost:3000/admin", '_blank');
    win.focus();
  }

  render(){
    return(
      <div style={{width:"210px",margin:"20px auto"}}>
        {this.state.loading && 
          <div className="example-stepper">
            <Spin className="diagram-spin" size="large"/>
          </div>        
        }
        <Stepper
          currentStep={this.state.currentStep}
          nextStep={() => this.nextStep()}
          nextTwoSteps={() => this.nextTwoSteps()}
          previousStep={() => this.previousStep()}
          selectCategory={(value) => this.selectCategory(value)}
          confirmContent={(content) => this.confirmContent(content)}
          selectedCategory={this.state.selectedCategory}
          changeIdentifier={(e) => this.changeIdentifier(e)}
        />
        <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
          Volver
        </Button>
        {this.state.selectedCategory != "" &&
          <div>
            {!this.state.done && 
              <Button onClick={() => this.confirm()}type="danger" style={{display:"inline-block", margin: "5px"}}>
                Confirmar
              </Button>
            }
            <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.showAdmin()}>
              Administrar contenidos
            </Button>
          </div>
        }
      </div>
    )
  }

}
