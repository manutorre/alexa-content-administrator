import React from 'react'
import { Card, Icon, Avatar } from 'antd';

export default class LeftPanel extends React.Component {
  
  constructor(props){
    super(props)
  }


  onContentDragEnd(event,content){
     // reset the border of the dragged element
     
     event.target.style.border = "";
  }

  onContentDragStart(event,content){
    event.dataTransfer.setData(content.title.text, 'foo');
    event.dataTransfer.setData("text", "");
    // store a reference to the dragged element
    let dragged = event.target;
    // Objects during drag will have a red border
    event.target.style.border = "2px solid red";
  }

  render(){
    const { Meta } = Card;
    return(
      <div className="no-assigned__cards__container">
        {this.props.data.map( (content, index) => {
          return(
            <div 
            key={index}
            draggable="true" 
            onDragStart={(e) => this.onContentDragStart(e,content)}
            onDragEnd={(e) => this.onContentDragEnd(e,content)}>
              <Card
              style={{ width:"80%" }}
                >
                  <Meta
                    title={content.title.text}
                    description={content.link.text}
                  />
              </Card>
            </div>
          )
        })}
      </div>
    )
  }

}