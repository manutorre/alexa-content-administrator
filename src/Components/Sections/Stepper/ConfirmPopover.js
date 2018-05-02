import React from 'react'
import {Popconfirm} from 'antd'

export default class ConfirmPopover extends React.Component {

render(){
  return(
    <div>
      <Popconfirm
        title="El título es el mostrado en la caja?"
        visible={this.props.titleState == "Esperando confirmación"}
        onConfirm={() => this.props.confirmProperty("title")}
        onCancel={() => this.props.cancelProperty("title")}>
      </Popconfirm>
      <Popconfirm
        title="El título es el mostrado en la caja?"
        visible={this.props.linkState == "Esperando confirmación"}
        onConfirm={() => this.props.confirmProperty("link")}
        onCancel={() => this.props.cancelProperty("link")}>
      </Popconfirm>
    </div>
  )
}


}
