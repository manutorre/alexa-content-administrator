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
      titleAndLinkStatus: "Confirmed",
      siblingStatus: "Waiting confirm"
    })
    this.props.nextTwoSteps();
  }

  cancelTitleAndLink(){
    this.setState({
      title: {xpath:"", text: ""},
      link: {xpath:"", url: "",className:"",tagName:"",urlPagina:""},
      titleAndLinkStatus: "Waiting"
    })
    window.parent.postMessage({"mge":"maskForNewContent"}, "*");
    window.parent.postMessage({"mge":"titleAndLinkRecognizing"}, "*");
  }

  askForConfirmTitleAndLink(){
    this.setState({
      titleAndLinkStatus: "Waiting confirm"
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
    
    //var username = this.props.username
    axios.get("https://alexa-apirest.herokuapp.com/users/categories")
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
    if (state == "Confirmed") {
      return <Icon type="check" />
    }
    if (state == "Waiting") {
      return <Icon type="loading" />
    }
    if (state == "Waiting confirmacion") {
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
            description={this.state.titleAndLinkStatus == "Confirmed" ? "Titulo: " + this.state.title.text : "Drag and drop content title into the box."}
          />
          <Step
            size="small"
            title={ this.state.titleAndLinkStatus != "Waiting" ? this.state.titleAndLinkStatus : "Getting link"}
            description={this.state.titleAndLinkStatus == "Confirmed" ? "Link: " + this.state.link.url : "Drag and drop content title into the box."}
            icon={this.iconKind(this.state.titleAndLinkStatus)}
          />
          <Step 
            title={this.state.siblingStatus != "Waiting" ? "Identify sibling contents" : "Set identifier and category."}
            size="small"
            description={this.props.selectedIdentifier ? "Contents identifier: "+this.props.selectedIdentifier : this.state.siblingStatus != "Waiting" ? "Select a criteria to recognize sibling contents." : ""}
            icon={this.props.selectedCategory && this.props.selectedIdentifier ? this.iconKind("Confirmed") : this.props.currentStep == 3 ? this.iconKind("Waiting confirm") : ""}
          />
        </Steps>
        <ConfirmPopover
          status = {this.state.titleAndLinkStatus}
          confirm = {() => this.confirmTitleAndLink()}
          cancel = {() => this.cancelTitleAndLink()}
          statusVisible = {this.state.titleAndLinkStatus}
          title={"Is "+this.state.title.text+" the correct title?"}
        />
        <ConfirmPopover
          status = {this.state.siblingStatus}
          confirm = {() => this.handleSiblings("Confirmed")}
          cancel = {() => this.handleSiblings("Waiting")}
          statusVisible = {this.state.siblingStatus}
          title={"Would you like to recognize sibling contents?"}
        />

        {this.props.currentStep == 3 && this.state.titleAndLinkStatus == "Confirmed" 
          && this.state.siblingStatus == "Confirmed" && 
            <SiblingsModal
              categories = {this.state.categories}
              titleAndLinkStatus = {this.state.titleAndLinkStatus}
              selectCategory = {(value) => this.selectCategory(value)}
              selectedCategory = {this.props.selectedCategory}
              changeIdentifier = {(e) => this.props.changeIdentifier(e)}
              returnSiblings = {(e) => this.returnSiblings(e) }
              confirmContent = {() => this.confirmContent() }
              clearCategory = {() => this.props.clearCategory() }
              setNavegable = {(e) => this.props.setNavegable(e)}
            />
        }
          
        {this.props.currentStep == 3 && this.state.titleAndLinkStatus == "Confirmed" 
          && this.state.siblingStatus == "Waiting" && 
            <Formulario
              selectCategory={(value) => this.selectCategory(value)}
              categories={this.state.categories}
              selectedCategory = {this.props.selectedCategory}
              changeIdentifier = {(e) => this.props.changeIdentifier(e)}
              setNavegable = {(e) => this.props.setNavegable(e)}
            /> 
        }
        
        {/* {canBack && <Button type="primary" onClick={() => this.props.previousStep()}>Anterior</Button>}
        {canNext && <Button type="primary" onClick={() => this.props.nextStep()}>Siguiente</Button>} */}
      </div>
    )
  }

}
