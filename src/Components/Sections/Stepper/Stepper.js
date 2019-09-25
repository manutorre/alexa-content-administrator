import React from 'react'
import { Steps, Button, Icon, Popconfirm, Select, Modal } from 'antd';
import ConfirmPopover from './ConfirmPopover'
import SiblingsModal from './SiblingsModal'
import Formulario from './Formulario'
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
      siblings:[],
      siblingStatus:false,
      categories:[]
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
      titleAndLinkStatus: "Confirmado",
      siblingStatus: "Esperando confirmacion"
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
      titleAndLinkStatus: "Esperando confirmacion"
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
    axios.get("https://alexa-apirest.herokuapp.com/users/categories/gonza")
    .then((response) =>{
      console.log(response.data);
      this.setState({
        categories: response.data
      });

    });

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
    if (state == "Esperando confirmacion") {
      return <Icon type="question-circle-o" />
    }
  }

  selectCategory(category){
    console.log(category)

    this.props.selectCategory({
      title: this.state.title,
      link: this.state.link
    },category)
  }

  confirmContent(){
    this.props.confirmContentSiblings({
      title: this.state.title,
      link: this.state.link
    },this.state.siblings)
  }

  handleSiblings(status){
    this.setState({
      siblingStatus:status
    })    
  }

  returnSiblings(e){
    const link = this.state.link
    console.log(e,link)
    switch (e) {
      case "Ubicacion":
        //console.log(window.parent.document.getElementsByClassName(link.className))
        window.parent.postMessage({"mge":"className","elem":link.className}, "*");
        break;
      case "Tipo de contenido":
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
            description={this.state.titleAndLinkStatus == "Confirmado" ? "Titulo: " + this.state.title.text : "Arrastrar el titulo del contenido hacia la caja de contenidos."}
          />
          <Step
            size="small"
            title={ this.state.titleAndLinkStatus != "Esperando" ? this.state.titleAndLinkStatus : "Obtener link"}
            description={this.state.titleAndLinkStatus == "Confirmado" ? "Link: " + this.state.link.url : "Arrastrar el titulo del contenido hacia la caja de contenidos."}
            icon={this.iconKind(this.state.titleAndLinkStatus)}
          />
          <Step 
            title={this.state.siblingStatus != "Esperando" ? "Reconocer contenidos hermanos" : "Asignar identificador y categoria"}
            size="small"
            description={this.props.selectedIdentifier ? "Identificador de contenidos: "+this.props.selectedIdentifier : this.state.siblingStatus != "Esperando" ? "Seleccionar un criterio para reconocer contenidos relacionados." : ""}
            icon={this.props.selectedCategory && this.props.selectedIdentifier ? this.iconKind("Confirmado") : this.props.currentStep == 3 ? this.iconKind("Esperando confirmacion") : ""}
          />
        </Steps>
        <ConfirmPopover
          status = {this.state.titleAndLinkStatus}
          confirm = {() => this.confirmTitleAndLink()}
          cancel = {() => this.cancelTitleAndLink()}
          statusVisible = {this.state.titleAndLinkStatus}
          title={"El titulo es: "+this.state.title.text+"?"}
        />
        <ConfirmPopover
          status = {this.state.siblingStatus}
          confirm = {() => this.handleSiblings("Confirmado")}
          cancel = {() => this.handleSiblings("Esperando")}
          statusVisible = {this.state.siblingStatus}
          title={"Desea reconocer contenidos relacionados?"}
        />

        {this.props.currentStep == 3 && this.state.titleAndLinkStatus == "Confirmado" 
          && this.state.siblingStatus == "Confirmado" && 
            <SiblingsModal
              categories = {this.state.categories}
              titleAndLinkStatus = {this.state.titleAndLinkStatus}
              selectCategory = {(value) => this.selectCategory(value)}
              selectedCategory = {this.props.selectedCategory}
              changeIdentifier = {(e) => this.props.changeIdentifier(e)}
              returnSiblings = {(e) => this.returnSiblings(e) }
              confirmContent = {() => this.confirmContent() }
              clearCategory = {() => this.props.clearCategory() }
            />
        }
          
        {this.props.currentStep == 3 && this.state.titleAndLinkStatus == "Confirmado" 
          && this.state.siblingStatus == "Esperando" && 
            <Formulario
              selectCategory={(value) => this.selectCategory(value)}
              categories={this.state.categories}
              selectedCategory = {this.props.selectedCategory}
              changeIdentifier = {(e) => this.props.changeIdentifier(e)}
              setNavegable = {(e) => this.props.setNavegable(e)}
            /> 
        }
        

        <br/>
        {/* {canBack && <Button type="primary" onClick={() => this.props.previousStep()}>Anterior</Button>}
        {canNext && <Button type="primary" onClick={() => this.props.nextStep()}>Siguiente</Button>} */}
      </div>
    )
  }

}
