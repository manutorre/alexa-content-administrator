import React from 'react'


export default class NewsStepper extends React.Component{

  componentDidMount(){
    console.log("escondeteee")
    window.parent.postMessage("hideMask", "*");
  }


  render(){
    return(
      <div>
        <div>Manu</div>
        <button onClick={() => this.props.changeSection("entry")}>Crear noticia</button>
      </div>
    )
  }

}
