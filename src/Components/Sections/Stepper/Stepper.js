import React from 'react'
import { Steps, Button, Icon, Popconfirm, Select, Input } from 'antd';
import ConfirmPopover from './ConfirmPopover'
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
        xpath:"",
        text:""
      },
      categories:[]
    }
  }

  assignTitleAndLink(titleObject, linkObject){
    const newTitle = Object.assign(this.state.title, {xpath: titleObject.data, text: titleObject.text})
    const newLink = Object.assign(this.state.link, {xpath: linkObject.data, text: linkObject.text, url: linkObject.url})
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
      link: {xpath:"", text: ""},
      titleAndLinkStatus: "Esperando"
    })
    window.parent.postMessage("maskForNewContent", "*");
    window.parent.postMessage("titleAndLinkRecognizing", "*");
  }

  askForConfirmTitleAndLink(){
    this.setState({
      titleAndLinkStatus: "Esperando confirmación"
    })
  }

  onMessageReceive(e){
    if (typeof e.data === "string"){
      window.parent.postMessage("hideMask", "*")
    }
    else{
      this.setState({array:e.data})
    }
    if (e.data.type === "titleAndLink") {
      console.log(e)
      this.assignTitleAndLink(e.data.title, e.data.link)
      window.parent.postMessage("hideMask", "*")
      this.askForConfirmTitleAndLink()
    }
  }

  componentDidMount(){
    
    fetch("https://alexa-apirest.herokuapp.com/users/categories/gonza")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            categories: result
          });
        })
    window.parent.postMessage("maskForNewContent", "*");
    window.parent.postMessage("titleAndLinkRecognizing", "*");
    window.addEventListener('message', (e) => this.onMessageReceive(e));
  }

  selectCategory(e){
    console.log(e)
    this.props.selectCategory(e)
    this.props.confirmContent({
      title: this.state.title,
      link: this.state.link
    })
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
    const {Step} = Steps //destructing assignament: me guardo en Step el campo Step del objeto Steps
    const canNext = this.props.currentStep < 2
    const canBack = this.props.currentStep > 0
    const Option = {Select}

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
            description={this.state.titleAndLinkStatus == "Confirmado" ? "Link: " + this.state.link.text : "Por favor, arrastre el título del contenido hacia la caja de contenido."}
            icon={this.iconKind(this.state.titleAndLinkStatus)}
          />
          <Step title={"Seleccionar categoría"}
            size="small"
            description={this.props.selectedCategory ? this.props.selectedCategory : "Elige una categoría para el contenido."}
            icon={this.props.selectedCategory ? this.iconKind("Confirmado") : this.props.currentStep == 3 ? this.iconKind("Esperando confirmación") : ""}
          />
        </Steps>
        <ConfirmPopover
          titleAndLinkStatus = {this.state.titleAndLinkStatus}
          confirmTitleAndLink = {() => this.confirmTitleAndLink()}
          cancelTitleAndLink = {() => this.cancelTitleAndLink()}
          title={this.state.title.text}
        />
        {/* <div className="steps-content"></div> */}
        {this.props.currentStep == 3 && this.state.titleAndLinkStatus == "Confirmado" &&
          <div>
          <Select placeholder="categoría" onChange={(e) => this.selectCategory(e)} style={{ width: 120, display: "block", margin: "0 auto" }}>
            {this.state.categories.map( (category, index) => {
              return(
                <Option 
                  key={index} 
                  selected={(this.state.selectedCategory == category).toString()} 
                  value={category.toString()}>
                    {category.toString()}
                </Option>
              )
            })}
          </Select>
          <br/>
          <Input placeholder="Nombre de la noticia" onChange={(e) => this.props.changeIdentifier(e)}/>
          </div>
        }
        <br/>
        {/* {canBack && <Button type="primary" onClick={() => this.props.previousStep()}>Anterior</Button>}
        {canNext && <Button type="primary" onClick={() => this.props.nextStep()}>Siguiente</Button>} */}
      </div>
    )
  }

}
