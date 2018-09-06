import React from 'react'
import {Card, List, Icon, Layout} from 'antd'
import * as SRD from "storm-react-diagrams"
import LeftPanel from './LeftPanel'
import Diagram from './Diagram'
import go from 'gojs';
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
            text:"Noticia 1"
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
            text:"Noticia 2"
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
            text:"Noticia 3"
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
            text:"Noticia 4"
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
            text:"Noticia 5"
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
            text:"Noticia 6"
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

  componentDidMount(){
    console.log(this.props)
  }

  render(){

    const globalContainer = {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      margin:"20px auto",
      backgroundColor:"grey"
    }

    // 1) setup the diagram engine
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    // 2) setup the diagram model
    var model = new SRD.DiagramModel();

    
    // 3) create a default node
    const portsIn = []
    const portsOut = []
    const nodes = []
    let link;
    this.state.confirmedContents.map( (content, index) => {
      nodes[index] = new SRD.DefaultNodeModel(content.title.text, "rgb(0,192,255)");
      portsOut[index] = nodes[index].addOutPort("Out");
      portsIn[index] = nodes[index].addInPort("In");
      if(index > 0){
        link = portsOut[index - 1].link(portsIn[index])
      }
      nodes[index].setPosition((index + 1) * 100, 100);
      if (link) {
        model.addAll(nodes[index], link)
      }
      else{
        model.addAll(nodes[index])
      }

      model.addListener({
        linksUpdated: e => {
          if (e.isCreated) {
            e.link.addListener({
              targetPortChanged: f => {
                if (Object.keys(f.port.links).length > 1) {
                    e.link.sourcePort.removeLink(e.link);
                    e.link.targetPort.removeLink(e.link);
                    model.removeLink(e.link);
                }
              }
            });
          }
        }
      });

      // console.log("portsIn")
      // console.log(portsIn)
      // console.log("portsOut")
      // console.log(portsOut)
      // console.log("nodes")
      // console.log(nodes)
      // console.log(model)
      // console.log("model")
    })


    // var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    // let port1 = node1.addOutPort("Out");
    // node1.setPosition(100, 100);
    // model.addAll(node1)
    // let arreglo = [2,3,4,5]
    // arreglo.map(index => {
    //   let node = new SRD.DefaultNodeModel(index.toString(), "rgb(0,192,255)")
    //   let port = node.addOutPort("Out")
    //   node.setPosition((index + 3) * 100, 100)
    //   model.addAll(node)
    // })

    // 5) link the ports
    // let link1 = port1.link(port2);

    // 6) add the models to the root graph
    // model.addAll(node1, node2, link1);

    // 7) load model into engine
    engine.setDiagramModel(model);
    const { Header, Footer, Sider, Content } = Layout;
    {/*
    <div style={globalContainer}>
      <SRD.DiagramWidget smartRouting={true} style={{backgroundColor:"grey"}} diagramEngine={engine} />;
    </div>      
    */}

    
    return(
      <div>
        <Layout>
        <Sider>
          <LeftPanel data={this.state.confirmedContents}/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Diagram 
              data={this.state.confirmedContents.map(
                (content) => { return{key:content.title.text, color:go.Brush.randomColor()}}
              )}/>
            </Content>
        </Layout>
        </Layout>
      </div>
    )
  }

}
