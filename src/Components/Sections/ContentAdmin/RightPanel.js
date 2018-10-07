import React from 'react'
import { Button } from 'antd';

export default class RightPanel extends React.Component {
  
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="no-assigned__cards__container">
        <Button onClick={() => this.props.sendData()}>Enviar contenidos</Button>
      </div>
    )
  }

}