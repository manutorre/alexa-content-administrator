import React from 'react'
import {Card, List, Icon} from 'antd'
import * as SRD from "storm-react-diagrams"
require("storm-react-diagrams/dist/style.min.css");


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

    // 1) setup the diagram engine
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    // 2) setup the diagram model
    var model = new SRD.DiagramModel();

    // 3) create a default node
    var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    let port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    // 4) create another default node
    var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
    let port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    // 5) link the ports
    let link1 = port1.link(port2);

    // 6) add the models to the root graph
    model.addAll(node1, node2, link1);

    // 7) load model into engine
    engine.setDiagramModel(model);

    return(
      <div style={globalContainer}>
        <SRD.DiagramWidget diagramEngine={engine} />;
      </div>
    )
  }

}
