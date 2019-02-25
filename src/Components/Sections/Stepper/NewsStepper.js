import React from 'react'
import { Button, Spin, Alert } from 'antd';
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
      done: false,
      contentSiblings:[],
      errorMessage:null
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

  selectCategory(content,categoria){
    this.setState({
      selectedCategory: categoria
    })
    this.confirmSingleContent(content,categoria)
  }

  clearCategory(){
    this.setState({
      selectedCategory: ""
    })
  }

  confirmContentSiblings(content,contentSiblings){
    const array = [];
    const contents = {
          categoria:this.state.selectedCategory,
          identificador:this.state.identifier
        }
    console.log("identifier ",this.state.identifier)
    if(contentSiblings.length > 0){
      contentSiblings.map((path,index)=>{
        const obj = {
            url:content.link.urlPagina,
            xpath:path
        }
        array.push(obj)
      })
    }
    contents.siblings = array;
    this.setState({
      contentSiblings: contents   
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  confirmBeforeSend(){
    let previousConfirmedState = this.state.confirmedContent
    previousConfirmedState.identificador = this.state.identifier
    previousConfirmedState.categoria = this.state.selectedCategory
    this.setState({confirmedContent:previousConfirmedState})
  }

  confirmSingleContent(content,categoria){
      const obj = {
          content:{
            url:content.link.urlPagina,
            xpath:content.link.xpath
          },
          categoria:categoria,
          identificador:this.state.identifier
      }
    console.log(this.state.identifier)
    console.log(obj)
    this.setState({
      confirmedContent: obj  
    }, console.log(JSON.stringify(this.state.confirmedContent)))
  }

  confirm(){  
    this.setState({loading:true})
    this.confirmBeforeSend()
    console.log(this.state)
    if(this.state.contentSibling){
      if(this.state.contentSiblings.siblings.length > 0){
        axios.post('https://alexa-apirest.herokuapp.com/users/addSiblingContents/user/gonza',
          this.state.contentSiblings)
        .then(() => this.setState({
            loading:false,
            done: true
        }))
      }
    } 
    else{
        axios.post('https://alexa-apirest.herokuapp.com/users/addContent/user/gonza',
          this.state.confirmedContent)
        .then(() => this.setState({
            loading:false,
            done: true
        }))
        .catch((e) => {
          this.setState({errorMessage:e.response.data})
        })       
      }   
  }

  showAdmin(){
    const win = window.open("http://localhost:3000/admin", '_blank');
    win.focus();
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
                    message="Success Tips"
                    description="The content was added correctly"
                    type="success"
                    showIcon
                  /> 
            }
          </div>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.showAdmin()}>
            Manage content
          </Button>
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
            Return
          </Button>          
        </div>
      )
    }
    else{
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
            selectCategory={(content,value) => this.selectCategory(content,value)}
            confirmContentSiblings={(content,siblings) => this.confirmContentSiblings(content,siblings)}
            selectedCategory={this.state.selectedCategory}
            changeIdentifier={(e) => this.changeIdentifier(e)}
            selectedIdentifier={this.state.identifier}
            clearCategory = {() => this.clearCategory() }
          />
          <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.props.changeSection("entry")}>
            Return
          </Button>
          {this.state.selectedCategory != "" && this.state.identifier != "" &&
            <div>
              {!this.state.done && 
                <Button onClick={() => this.confirm()}type="danger" style={{display:"inline-block", margin: "5px"}}>
                  Confirm
                </Button>
              }
              <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.showAdmin()}>
                Manage content
              </Button>
            </div>
          }
        </div>
      )
    }
  }

}
