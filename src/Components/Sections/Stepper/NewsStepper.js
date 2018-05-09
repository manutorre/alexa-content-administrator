import React from 'react'
import { Button } from 'antd';
import Stepper from './Stepper'

export default class NewsStepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showSteps: false,
      currentStep: 1,
      confirmedContent: {},
      selectedCategory: ""
    }
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
    this.setState({
      selectedCategory: categoria
    })
  }

  confirmContent(content){
    this.setState({
      confirmedContent:Object.assign(this.state.confirmedContent, content)
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  showState(){
    console.log(this.state)
  }

  showAdmin(){
    const win = window.open("http://localhost:3000/admin", '_blank');
    win.focus();
  }

  render(){
    return(
      <div style={{width:"210px",margin:"20px auto"}}>
        <Stepper
          currentStep={this.state.currentStep}
          nextStep={() => this.nextStep()}
          nextTwoSteps={() => this.nextTwoSteps()}
          previousStep={() => this.previousStep()}
          selectCategory={(value) => this.selectCategory(value)}
          confirmContent={(content) => this.confirmContent(content)}
          selectedCategory={this.state.selectedCategory}
        />
        <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
          Volver
        </Button>
        {this.state.selectedCategory != "" &&
          <div>
            <Button onClick={() => this.showState()}type="danger" style={{display:"inline-block", margin: "5px"}}>
              Confirmar
            </Button>
            <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.showAdmin()}>
              Administrar contenidos
            </Button>
          </div>
        }
      </div>
    )
  }

}
