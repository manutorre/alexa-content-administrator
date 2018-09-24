import React from 'react'
import { Card, Icon, Avatar } from 'antd';

export default class LeftPanel extends React.Component {
  
  constructor(props){
    super(props)
  }


  onContentDragEnd(event,content){
     // reset the border of the dragged element
     event.target.style.display = "none"
     event.target.style.border = "";
  }

  onContentDragStart(event,content){

    console.log(content)
    event.dataTransfer.setData(JSON.stringify({titleText:content.idInc}), 'titleText');
    event.dataTransfer.setData(JSON.stringify({linkText:content.url}), 'linkText');
    // event.dataTransfer.setData(JSON.stringify({titleXpath:content.title.xpath}), 'titleXpath');
    // event.dataTransfer.setData(JSON.stringify({linkXpath:content.link.xpath}), 'linkXpath');    

    // store a reference to the dragged element
    let dragged = event.target;
    // Objects during drag will have a red border
    event.target.style.border = "2px solid red";
  }

  render(){
    const { Meta } = Card;
    return(
      <div className="no-assigned__cards__container">
        {this.props.data && this.props.data.map( (content, index) => {
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

                    title={content.idInc}
                    description={content.url}
                    // title={content.title.text}
                    // description={content.link.text}

                  />
              </Card>
            </div>
          )
        })}
      </div>
    )
  }

}