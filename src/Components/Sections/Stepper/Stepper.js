import React from 'react'
import { Steps, Button, Icon, Popconfirm, Select, Modal } from 'antd';
import ConfirmPopover from './ConfirmPopover'
import SiblingsModal from './SiblingsModal'
import axios from 'axios'


export default class Stepper extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      titleAndLinkStatus: false,
      title:{
        xpath:"",
        text: ""
      },
      link:{
        urlPagina:"",
        xpath:"",
        url:"",
        className:"",
        tagName:""
      },
      siblings:[]
    }
  }

  assignTitleAndLink(titleObject, linkObject){
    const newTitle = Object.assign(this.state.title, {xpath: titleObject.data, text: titleObject.text})
    const newLink = Object.assign(this.state.link, {xpath: linkObject.data, url: linkObject.url, urlPagina:linkObject.urlPagina,  
                                                    className:linkObject.className, tagName:linkObject.tagName})
    this.setState({
      titleAndLinkStatus: false,
      title:newTitle,
      link: newLink
    })
  }

  confirmTitleAndLink(){
    this.setState({
      titleAndLinkStatus: "Confirmado"
    })
    this.props.nextTwoSteps();
  }

  cancelTitleAndLink(){
    this.setState({
      title: {xpath:"", text: ""},
      link: {xpath:"", url: "",className:"",tagName:"",urlPagina:""},
      titleAndLinkStatus: "Esperando"
    })
    window.parent.postMessage({"mge":"maskForNewContent"}, "*");
    window.parent.postMessage({"mge":"titleAndLinkRecognizing"}, "*");
  }

  askForConfirmTitleAndLink(){
    this.setState({
      titleAndLinkStatus: "Esperando confirmación"
    })
  }

  onMessageReceive(e){
    if (typeof e.data === "string"){
      window.parent.postMessage({"mge":"hideMask"}, "*")
    }
    else{
      this.setState({array:e.data})
    }
    if (e.data.type === "titleAndLink") {
      console.log(e)
      this.assignTitleAndLink(e.data.title, e.data.link)
      window.parent.postMessage({"mge":"hideMask"}, "*")
      this.askForConfirmTitleAndLink()
    }
    if(e.data.type === "className" || e.data.type === "tagName"  ){
      console.log("Mensaje desde el stepper ",e.data)
      this.setState({
        siblings:e.data.pathsElem
      })
    }

  }

  componentDidMount(){
    window.parent.postMessage({"mge":"maskForNewContent"}, "*");
    window.parent.postMessage({"mge":"titleAndLinkRecognizing"}, "*");
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

  selectCategory(e){
    console.log(e)
    this.props.selectCategory(e)
  }

  confirmContent(){
    this.props.confirmContent({
      title: this.state.title,
      link: this.state.link
    },this.state.siblings)
  }

  returnSiblings(e){
    const link = this.state.link
    console.log(e,link)
    switch (e) {
      case "className":
        //console.log(window.parent.document.getElementsByClassName(link.className))
        window.parent.postMessage({"mge":"className","elem":link.className}, "*");
        break;
      case "tagName":
        //console.log(window.parent.document.getElementsByTagName(link.tagName))
        window.parent.postMessage({"mge":"tagName","elem":link.tagName}, "*");
        break;
      default:
        break;
    }
  }

  render(){
    const {Step} = Steps //destructing assignament: me guardo en Step el campo Step del objeto Steps
    const canNext = this.props.currentStep < 2
    const canBack = this.props.currentStep > 0

    return(
      <div>
        <Steps current={this.props.currentStep - 1}>
          <Step
            size="small"
            title={this.state.titleAndLinkStatus}
            icon={this.iconKind(this.state.titleAndLinkStatus)}
            description={this.state.titleAndLinkStatus == "Confirmado" ? "Título: " + this.state.title.text : "Por favor, arrastre el título del contenido hacia la caja de contenido."}
          />
          <Step
            size="small"
            title={ this.state.titleAndLinkStatus != "Esperando" ? this.state.titleAndLinkStatus : "Obtener link"}
            description={this.state.titleAndLinkStatus == "Confirmado" ? "Link: " + this.state.link.url : "Por favor, arrastre el título del contenido hacia la caja de contenido."}
            icon={this.iconKind(this.state.titleAndLinkStatus)}
          />
          <Step title={"Reconocer contenidos hermanos"}
            size="small"
            description={this.props.selectedIdentifier ? "Identificador de contenidos: "+this.props.selectedIdentifier : "Selecciona un criterio para reconocer contenidos hermanos."}
            icon={this.props.selectedCategory ? this.iconKind("Confirmado") : this.props.currentStep == 3 ? this.iconKind("Esperando confirmación") : ""}
          />
        </Steps>
        <ConfirmPopover
          titleAndLinkStatus = {this.state.titleAndLinkStatus}
          confirmTitleAndLink = {() => this.confirmTitleAndLink()}
          cancelTitleAndLink = {() => this.cancelTitleAndLink()}
          title={this.state.title.text}
        />

        <SiblingsModal
          currentStep = {this.props.currentStep}
          titleAndLinkStatus = {this.state.titleAndLinkStatus}
          selectCategory = {(value) => this.selectCategory(value)}
          selectedCategory = {this.props.selectedCategory}
          changeIdentifier = {(e) => this.props.changeIdentifier(e)}
          returnSiblings = {(e) => this.returnSiblings(e) }
          confirmContent = {() => this.confirmContent() }
          clearCategory = {() => this.props.clearCategory() }
        />

        <br/>
        {/* {canBack && <Button type="primary" onClick={() => this.props.previousStep()}>Anterior</Button>}
        {canNext && <Button type="primary" onClick={() => this.props.nextStep()}>Siguiente</Button>} */}
      </div>
    )
  }

}
