import React from 'react'
import {Button} from 'antd'

export default class Categories extends React.Component{

  render(){
    return(
      <div>
        <h1>Categorías</h1>
        <h3>Ud no tiene categorías disponibles</h3>
        <Button onClick={() => this.props.changeSection("entry")}>Volver</Button>
      </div>
    )
  }


}
