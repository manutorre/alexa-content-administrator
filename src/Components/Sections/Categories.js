import React from 'react'
import {Button, Select, Option} from 'antd'

export default class Categories extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      categories:[
        "Deportes",
        "Política",
        "Turismo",
        "Ciencia",
        "Tecnología"
      ]
    }
  }


  render(){

    const {Option} = Select

    return(
      <div>
        <h1>Categorías</h1>
        <Select defaultValue="Deportes" style={{ width: 120 }}>
          {this.state.categories.map( category => {
            return(
              <Option value={category}>{category}</Option>
            )
          })}
        </Select>
        <Button onClick={() => this.props.changeSection("entry")}>Volver</Button>
      </div>
    )
  }


}
