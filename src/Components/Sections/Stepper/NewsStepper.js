import React from 'react'
import { Button } from 'antd';
import Stepper from './Stepper'

export default class NewsStepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showSteps: false,
      currentStep: 1,
      newsContent: ""
    }
  }

  nextStep(){
    this.setState({currentStep: this.state.currentStep + 1})
  }

  previousStep(){
    this.setState({currentStep: this.state.currentStep -1})
  }

  render(){
    return(
      <div style={{width:"210px",margin:"20px auto"}}>
        <Stepper currentStep={this.state.currentStep} nextStep={() => this.nextStep()} previousStep={() => this.previousStep()}/>
        <Button onClick={() => this.props.changeSection("entry")}>
          Volver
        </Button>
      </div>
    )
  }

}
