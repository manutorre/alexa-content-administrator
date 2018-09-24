import React from 'react'
import {Card, List, Icon, Layout} from 'antd'
import * as SRD from "storm-react-diagrams"
import LeftPanel from './LeftPanel'
import Diagram from './Diagram'
import go from 'gojs';
import axios from 'axios'

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

  componentWillMount(){
    axios.get("https://alexa-apirest.herokuapp.com/users/noticesByState/new/gonza").then( (response) => {
      this.setState({confirmedContents:response.data})
      console.log(response)})
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

    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    var model = new SRD.DiagramModel();

    
    const portsIn = []
    const portsOut = []
    const nodes = []
    let link;
      this.state.confirmedContents.map( (content, index) => {
      // nodes[index] = new SRD.DefaultNodeModel(content.title.text, "rgb(0,192,255)");
      nodes[index] = new SRD.DefaultNodeModel(content.url, "rgb(0,192,255)");
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
    })

    engine.setDiagramModel(model);
    const { Header, Footer, Sider, Content } = Layout;
    
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
                (content) => { return{key:content.url, color:go.Brush.randomColor()}}
              )}/>
            </Content>
        </Layout>
        <Sider>
          <LeftPanel/>
        </Sider>
        </Layout>
      </div>
    )
  }

}
