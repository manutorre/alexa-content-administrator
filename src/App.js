import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      array:[],
      value:1,
      str:"",
      action:"",
      selected:"",
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
    console.log("manu")
    window.addEventListener('message', (e) => (typeof e.data === "string") ? this.setState({str:e.data}) : this.setState({array:e.data})   );//console.log(e.data)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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

      </div>
    );
  }
}

export default App;

//this.state.array[this.state.value]
