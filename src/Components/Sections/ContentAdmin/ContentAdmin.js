import React from 'react'
import {Card, List, Icon} from 'antd'

export default class ContentAdmin extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      confirmedContents: [
        {
          category:"Deportes",
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
          category:"Deportes",
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
          category:"Deportes",
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
          category:"Deportes",
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
          category:"Deportes",
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
          category:"Ciencia",
          title:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]/div[1]/h1[1]",
            text:"Benítez: “Lo del ADN, que no se malinterprete, es secundario"
          },
          link:{
            xpath:"body/div[1]/section[1]/section[1]/article[1]/a[1]",
            text:"nota/79920/benitez_lo_del_adn_que_no_se_malinterprete_es_secundario/"
          }
        }
      ],
      filteredContents:[]
    }
  }

//mocked data

  filterByCategory(category){
    let filtered = this.state.confirmedContents.filter( (content) => content.category == category)
    this.setState({
      filteredContents: filtered
    })
  }

  render(){

    const globalContainer = {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      margin:"20px auto"
    }

    const leftPanelStyle = {
      border: "1px solid #ebedf0",
      width:"20%"
    }

    const contentsContainer = {margin: "20px auto",
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"flex-start",
      width:"100%"
    }

    const allCategories = [...new Set(this.state.confirmedContents.map(content => content.category))]
    const contentsToShow = this.state.filteredContents.length > 0 ? this.state.filteredContents : this.state.confirmedContents

    return(
      <div style={globalContainer}>
        <h1 style={{margin: "20px auto"}}>
          Administrador de contenidos
        </h1>
        <div style={{display:"flex", flexDirection: "row"}}>
          <div style={leftPanelStyle}>
            <List
              dataSource={allCategories}
              footer={<div onClick={() => this.filterByCategory("")}><a>Mostrar todos</a></div>}
              renderItem={item => (<List.Item onClick={() => this.filterByCategory(item)}><a>{item}</a></List.Item>)}
            />
          </div>
          <div style={contentsContainer}>
            {contentsToShow.map( content => {
              return(
                <div>
                  <Card
                    style={{ width: 250, margin:"20px" }}
                    title={content.title.text}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}
