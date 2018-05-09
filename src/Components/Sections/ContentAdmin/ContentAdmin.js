import React from 'react'
import {Card} from 'antd'

export default class ContentAdmin extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      confirmedContents: [
        {
          title:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]/div[1]/h1[1]",
            text:"Benítez: “Lo del ADN, que no se malinterprete, es secundario"
          },
          link:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]",
            text:"nota/79920/benitez_lo_del_adn_que_no_se_malinterprete_es_secundario/"
          }
        },
        {
          title:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]/div[1]/h1[1]",
            text:"Benítez: “Lo del ADN, que no se malinterprete, es secundario"
          },
          link:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]",
            text:"nota/79920/benitez_lo_del_adn_que_no_se_malinterprete_es_secundario/"
          }
        }
      ]
    }
  }

//mocked data

  render(){

    const globalContainer = {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      width: "70%",
      margin:"20px auto"
    }

    return(
      <div style={globalContainer}>
        <h1 style={{margin: "20px auto"}}>
          Administrador de contenidos
        </h1>
        <div style={{margin: "20px auto"}}>
          {this.state.confirmedContents.map( content => {
            return(
              <Card
                style={{ width: 300 }}
                title={content.title.text}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              />
            )
          })}
        </div>
      </div>
    )
  }

}
