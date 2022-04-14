import React, { Component } from 'react';
import logo from '../../logo.svg';
import {Button, Input, Alert} from 'antd'
import axios from 'axios'

export default class Entry extends Component {

  constructor(props){
    super(props);
    this.state={
      array:[],
      value:1,
      str:"",
      action:"",
      selected:"",
      username:"",
      logueado:false,
      errorLogin:false
    }
  }

  onMessageReceive(e){
    if (typeof e.data === "string"){
      this.setState({str:e.data})
    }
    else{
      this.setState({array:e.data})
    }
  }

  onSelectAction(event){
    var e = document.getElementById("selectAction");
    var valor = e.options[e.selectedIndex].value;

    if(valor==="notice"){
      this.setState({selected:"selectNotice"});
      alert("Ahora arrastre el titulo de una noticia");
    }else{
      this.setState({selected:"selectSection"});
      alert("Ahora arrastre el titulo de una noticia para obtener las hermanas");
    }

    this.setState({action:valor});
    window.parent.postMessage(valor, "*");
  }

  myFunction(event){
    var e = document.getElementById("select");
    this.setState({value:e.options[e.selectedIndex].value});
    //document.getElementById("iframe").contentWindow.postMessage(data, "*");
  }
  componentDidMount(){
    // axios.get("https://alexa-apirest.herokuapp.com/users/getSessionName")
    // .then((response) =>{
    //   console.log(response.data);
    //   this.setState({
    //     username: response.data
    //   });

    // });
    //window.parent.postMessage("showMask","*");
    window.parent.postMessage({"mge":"hideMask"}, "*")
    window.addEventListener('message', (e) => this.onMessageReceive(e));//console.log(e.data)
  }

  cerrarSesion(){
    axios.get("https://alexa-apirest.herokuapp.com/users/closeSession")
    .then((response) =>{
      console.log(response.data);
      this.setState({
        username: "",
        logueado:false
      });
    });

  }

  changeUser = (e) => {
    console.log("Username ",e.target.value)
    this.setState({
      username:e.target.value
    })
  }

  registro(){
    axios.post("https://alexa-apirest.herokuapp.com/users/newUser",{name:this.state.username})
    .then((response) =>{
      console.log(response);
      this.setState({
        logueado:true
      })
    }).catch((e) => {
      //Manejar el error
    })
  }

  login(){
    axios.get("https://alexa-apirest.herokuapp.com/users/getUser/" + this.state.username)
    .then((response) =>{
      console.log(response);
      this.setState({
        logueado:true,
        errorLogin:false
      })
    }).catch((e) => {
      this.setState({
        errorLogin:true
      })
      //Manejar el error
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{color:"white"}}>ContentParser</h1>
        </header>
        <p className="App-intro">
        </p>

        { //(this.state.username != "" && this.state.logueado == true ) &&
        <div className='ButtonsWrapper' style={{alignItems:'center', marginLeft:300, marginRight:300}}>

          <Alert
            message={"Welcome "+this.state.username}
            type="success"
          />

          <h2>
            We will guide you through the chatbot generation process.
          </h2>

          <h3 className="App-intro">
            1 - What information the chatbot should support on it responses?
          </h3>

          <Button className='buttons' onClick={() => this.props.changeSection("stepper")}>
            Select a content from website
          </Button>

          <h3 className="App-intro">
            2 - Which properties of the defined content the chatbot should recognize?
          </h3>

          <Button className='buttons' onClick={() => this.props.changeSection("checkout")}>
            Select desired properties for this content
          </Button>

          <h2>
            Great! You already created a content that can be recognized by the chatbot!
          </h2>

          <h3 className="App-intro">
            3 - Now is time to define which words will map with the content defined before.
          </h3>

            <label for="contentWords">Enter some text and press enter to add a new word</label>
            <textarea style={{marginTop:20, marginBottom:20}} id="contentWords" name="contentWords" rows="4" cols="50" placeholder="Content Words">
            </textarea>
          {/*<Button className='buttons' onClick={() => this.props.changeSection("contentWords")}>
            Define words
          </Button>*/}

          <p className="App-intro">
            The contents from a Website could be organized into 'Categories', which let you find a product quickly
            in the web, for example using the options of a Menu.
          </p>

          <h3 className="App-intro">
            4 - Please, define 'Categories' associated to the content.
          </h3>

          <Button className='buttons' onClick={() => this.props.changeSection("category")}>
            Define categories
          </Button>

          <h2>
            Great! Your chatbot now recognize your contents and can filter them by categories. You almost got it! 
          </h2>

          <h3 className="App-intro">
            6 - The next step is to define "Actions". An action represents a discrete outcome you want your assistant to be able to accomplish in response to a user's request.
          </h3>

          <Button className='buttons' onClick={() => this.props.changeSection("category")}>
            Define actions
          </Button>

          {/*<Button style={{marginTop:70}}
            ghost
            type="danger"           
            className='buttons'
            onClick={() => this.cerrarSesion()}>
              Log out
          </Button>
          */}
        </div>
        }

        {/*{ (this.state.logueado == false) &&
          <div>
            {(this.state.logueado == false && this.state.errorLogin == true) &&
            <Alert
                message={"No existe ningun usuario con ese nombre"}
                type="error"
            />
            }

            <Input placeholder="Username" 
                  onChange={(e) => this.changeUser(e)} 
                  style={{display:"inline-block", width: "150px", margin: "10px"}}/>

            <Button style={{display:"inline-block", margin: "5px"}} onClick={() => this.login()}>
              Login
            </Button>

          </div>
        }*/}
      </div>
    );
  }
}

/*
      <label >Accion a realizar</label>
      <select defaultValue="-" id="selectAction" onChange={(event) => { this.onSelectAction(event) }}>
          <option disabled value="-">-Seleccionar accion</option>
          <option value="notice">Create notice</option>
          <option value="section">Create section</option>
      </select>


        {(this.state.selected === "selectSection" && this.state.array.length > 0 )?
        <div>
        <label >Numero de noticia</label>
          <select id="select" onChange={(event) => { this.myFunction(event) }}>
          {
            this.state.array.map((c) => <option key={this.state.array.indexOf(c)} value={this.state.array.indexOf(c)} >{this.state.array.indexOf(c)}</option>)
          }
          </select>
          <br/>
          <textarea rows="5" cols="25" value={this.state.array[this.state.value]}/>
        </div>

        :

        <div>
          <br/>
          <textarea rows="5" cols="25" value={this.state.str}/>
        </div>
        }

*/