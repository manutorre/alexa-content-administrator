import React from 'react'
import { Steps, Button, Icon, Popconfirm } from 'antd';
import ConfirmPopover from './ConfirmPopover'

export default class Stepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      title:{
        xpath:"",
        text: "",
        state: "Esperando"
      },
      link:{
        xpath:"",
        text:"",
        state: false
      },
    }
  }

  assignProperty(property, text,xpath){
    const newProperty = Object.assign(this.state[property], {xpath:xpath, text:text, state: false})
    this.setState({
      [property]: newProperty
    })
  }

  confirmProperty(property){
    const newProperty = Object.assign(this.state[property], {state: "Confirmado"})
    this.setState({
      [property]: newProperty
    })
    this.props.nextStep()
    property === "title" && this.getLink()
  }

  cancelProperty(property){
    this.setState({
      [property]: {xpath:"", text: "", state: "Esperando"}
    })
    window.parent.postMessage("maskForNewContent", "*");
    window.parent.postMessage("titleRecognizing", "*");
    window.addEventListener('message', (e) => this.onMessageReceive(e));
  }

  askForPropertyConfirm(property){
    const newProperty = Object.assign(this.state[property], {state:"Esperando confirmación"})
    this.setState({
      [property]: newProperty
    }, console.log(this.state))
  }

  onMessageReceive(e){
    if (typeof e.data === "string"){
      window.parent.postMessage("hideMask", "*")
    }
    else{
      this.setState({array:e.data})
    }
    if (e.data.type === "title" || e.data.type === "link" ) {
      this.assignProperty(e.data.type, e.data.text, e.data.data)
      window.parent.postMessage("hideMask", "*")
      this.askForPropertyConfirm(e.data.type)
    }
  }

  getLink(){
    window.parent.postMessage("maskForNewContent", "*");
    window.parent.postMessage("linkRecognizing", "*");
  }

  componentDidMount(){
    window.parent.postMessage("maskForNewContent", "*");
    window.parent.postMessage("titleRecognizing", "*");
    window.addEventListener('message', (e) => this.onMessageReceive(e));
  }

  iconKind(state){
    if (state == "Confirmado") {
      return <Icon type="check" />
    }
    if (state == "Esperando") {
      return <Icon type="loading" />
    }
    if (state == "Esperando confirmación") {
      return <Icon type="question-circle-o" />
    }
  }

  render(){
    const {Step} = Steps
    const canNext = this.props.currentStep < 2
    const canBack = this.props.currentStep > 0


    return(
      <div>
        <Steps current={this.props.currentStep}>
          <ConfirmPopover
            titleState = {this.state.title.state}
            linkState = {this.state.link.state}
            confirmProperty = {(property) => this.confirmProperty(property)}
            cancelProperty = {(property) => this.cancelProperty(property)}
          />
          <Step
            size="small"
            title={this.state.title.state}
            icon={this.iconKind(this.state.title.state)}
            description={this.state.title.state == "Confirmado" ? "Título: " + this.state.title.text : "Por favor, arrastre el título del contenido hacia la caja de contenido."}
          />
          <Step
            size="small"
            title={ this.state.link.state ? this.state.link.state : "Obtener link"}
            description={this.state.link.state == "Confirmado" ? "Link: " + this.state.link.text : "Por favor, arrastre el título del contenido hacia la caja de contenido."}
            icon={this.iconKind(this.state.link.state)}
          />
          <Step title={"Confirmar"}
            size="small"
            description="This is a description."
          />
        </Steps>
        <div className="steps-content">{this.state.title.text}</div>
        <br/>
        {/* {canBack && <Button type="primary" onClick={() => this.props.previousStep()}>Anterior</Button>}
        {canNext && <Button type="primary" onClick={() => this.props.nextStep()}>Siguiente</Button>} */}
      </div>
    )
  }

}
