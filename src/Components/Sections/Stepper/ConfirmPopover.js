import React from 'react'
import {Popconfirm} from 'antd'

export default class ConfirmPopover extends React.Component {

render(){
  return(
    <div>
      <Popconfirm
        arrow={false}
        title={"El título es: '" + this.props.title + "'?"}
        visible={this.props.titleAndLinkStatus == "Esperando confirmación"}
        onConfirm={() => this.props.confirmTitleAndLink()}
        onCancel={() => this.props.cancelTitleAndLink()}>
      </Popconfirm>
    </div>
  )
}


}
