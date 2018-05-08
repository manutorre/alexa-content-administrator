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
    }, console.log(this.state))
  }

  showState(){
    console.log(this.state)
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
        />
        <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
          Volver
        </Button>
        {this.state.selectedCategory != "" &&
          <Button onClick={() => this.showState()}type="danger" style={{display:"inline-block", margin: "5px"}}>
            Confirmar
          </Button>
        }
      </div>
    )
  }

}
