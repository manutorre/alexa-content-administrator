import React, {Component} from 'react';
import go from 'gojs';
const goObj = go.GraphObject.make;

export default class GoJs extends Component {

  constructor (props) {
    super (props);
    this.renderCanvas = this.renderCanvas.bind (this);
    this.state = {
      orderedNodes: [],
      contents:[],
      links:[],
      myModel: null, 
      myDiagram: null
    }
    this.onDiagramEnter = this.onDiagramEnter.bind(this)
    this.onDiagramDrop = this.onDiagramDrop.bind(this)
    this.onDragOver = this.onDragOver.bind(this)
  }

  componentDidMount () {
    this.renderCanvas ();
  }

  generateNodeTemplate(){
    let nodeTemplate = goObj(
      go.Node,
     "Auto",
      new go.Binding('location'),
      goObj(
        go.Shape, "RoundedRectangle",
        {
          portId: "", 
          fromLinkable: true, 
          toLinkable: true,
          toMaxLinks:1,
          fromMaxLinks:1,
          toLinkableSelfNode: false
        },
        new go.Binding("fill", "color")
      ),
      goObj(
        go.TextBlock,
        { margin: 6, font: "18px sans-serif" },
        new go.Binding("text", "titleText")
      )
    )
    return nodeTemplate;    
  }

  generateLinkTemplate(){
    let linkTemplate = goObj(go.Link,
      { curve: go.Link.Bezier },
      {relinkableFrom: true, relinkableTo: true},
      goObj(go.Shape),  // the link shape
      goObj(go.Shape,   // the arrowhead
        { toArrow: "OpenTriangle", fill: null })
    );
    return linkTemplate
  }


  renderCanvas () {
    let that = this
    let model = goObj(go.TreeModel)
    let diagram = goObj(go.Diagram, this.refs.goJsDiv, {initialContentAlignment: go.Spot.Center});
    // DOUBLE CLICK EVENT LISTENER
    // diagram.addDiagramListener("ObjectDoubleClicked",  (ev) => {
    //   console.log(ev); //Successfully logs the node you clicked.
    //   console.log(ev.subject.part); //Successfully logs the node's name.
    //   ev.diagram.model.addLinkData({from:ev.subject.part.key, to:ev.diagram.model.nodeDataArray[0].key})
    //   console.log(ev.diagram.model.linkDataArray)
    //   data.push(ev.subject.part.key)
    //   console.log(data)
    // });

    diagram.addDiagramListener("LinkDrawn", (ev) => {
      // console.log(diagram.model.toJson());
      let {links} = this.state
      links.push({from:ev.subject.fromNode.data.titleText, to: ev.subject.toNode.data.titleText})
      this.setState({links})
      // console.log(this.state.links)
      // console.log(ev.diagram.findTreeLabel())
      this.reorderNodes()
      // console.log(this.primero())
    })
    this.setModelAndDiagram(model, diagram)
  
  }

  primero(){
    let primero = this.state.contents.filter((content) => {
      if (this.state.links.filter((link) => link.to == content.titletext).length == 0)
        return true
    })
    return primero[0]
  }


  

  reorderNodes(){
    let primerNodo = this.primero()
    let primerLink = this.state.links.filter( link => link.from == primerNodo.titletext)
    let orderedNodes = [primerNodo]
    let lastNodo = primerNodo
    for (let index = 0; index < this.state.links.length; index++) {
      let properLink = this.state.links.filter( link => link.from == lastNodo.titletext)[0]
      lastNodo = this.state.contents.filter( content => content.titletext == properLink.to)[0]
      orderedNodes.push(lastNodo)
    }
    console.log(orderedNodes)
    // let contenidos = [] 
    // this.state.links.map( (link, index) => {
    //   if (index != this.state.links.length - 1) {
    //     contenidos.push(this.state.contents.filter( contenido => contenido.titletext == link.from )[0])
    //   }
    // })
    // contenidos.push(this.state.contents.filter(contenido => contenido.titletext == this.state.links[this.state.links.length - 1].from)[0])
    // contenidos.push(this.state.contents.filter(contenido => contenido.titletext == this.state.links[this.state.links.length - 1].to)[0])
    // return contenidos
  }


  generateLinksArray(){
    let linksArray = []
    this.props.data.map((content, index) => {
      if (index > 0) {
        let newLink = {from:this.props.data[index - 1].key, to:content.key}
        linksArray.push(newLink)
      }
    })
    return linksArray
  }

  
  componentWillUpdate (prevProps) { //se actualiza sólo cuando cambia la data
    if (this.props.data !== prevProps.data) {
      const model = this.state.myModel
      const diagram = this.state.myDiagram
      this.setModelAndDiagram(model, diagram)
    }
  }

  setModelAndDiagram(model, diagram){
    model.nodeDataArray = this.props.data
    let linksArray = this.generateLinksArray()
    diagram.model = new go.GraphLinksModel([],[]);
    diagram.nodeTemplate = this.generateNodeTemplate()
    diagram.linkTemplate = this.generateLinkTemplate()
    diagram.validCycle = go.Diagram.CycleDestinationTree;
    this.setState({
      myModel: model, 
      myDiagram: diagram
    })    
  }
  
  onDiagramEnter(event){
    event.preventDefault();
      // Here you could also set effects on the Diagram,
      // such as changing the background color to indicate an acceptable drop zone
      // Requirement in some browsers, such as Internet Explorer
  }

  getContentStructure(content1,content2,content3,content4){ //crea el content object
    let parsedContent1 = JSON.parse(content1)
    let parsedContent2 = JSON.parse(content2)
    // let parsedContent3 = JSON.parse(content3)
    // let parsedContent4 = JSON.parse(content4)
    let content = ({...parsedContent1,...parsedContent2})
    // let content = ({...parsedContent1,...parsedContent2,...parsedContent3,...parsedContent4})
    let contents = this.state.contents
    contents.push(content)
    this.setState({contents})
    return content.titletext
    }


  onDiagramDrop(event){
    window.PIXELRATIO = this.state.myDiagram.computePixelRatio();
    let pixelratio = window.PIXELRATIO;
    let can = event.target;

    // if the target is not the canvas, we may have trouble, so just quit:
    if (!(can instanceof HTMLCanvasElement)) return;
    let diagram = this.state.myDiagram
    var bbox = can.getBoundingClientRect();
    var bbw = bbox.width;
    if (bbw === 0) bbw = 0.001;
    var bbh = bbox.height;
    if (bbh === 0) bbh = 0.001;
    var mx = event.clientX - bbox.left * ((can.width/pixelratio) / bbw);
    var my = event.clientY - bbox.top * ((can.height/pixelratio) / bbh);
    var point = diagram.transformViewToDoc(new go.Point(mx, my));
    diagram.startTransaction('new node');
    diagram.model.addNodeData({
      location: point,
      titleText: this.getContentStructure(
        event.dataTransfer.items[0].type, 
        event.dataTransfer.items[1].type),
        // event.dataTransfer.items[2].type, 
        // event.dataTransfer.items[3].type),
        color:go.Brush.randomColor()
    });
    diagram.commitTransaction('new node');
    this.setState({
      myDiagram:diagram,
      myModel:diagram.model
    })
    // console.log(diagram.model.toJson());
    // remove dragged element from its old location
    // if (remove.checked) dragged.parentNode.removeChild(dragged);    
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }
  
  render () {
    return(
      <div 
      onDragEnter={this.onDiagramEnter} 
      className="diagram"
      onDrop={this.onDiagramDrop}
      onDragOver={this.onDragOver}
      >
        <div  ref="goJsDiv" style={{
            'width': '100%',
            'height': '800px', 
            'backgroundColor': "white"
          }}>
        </div>
        <div className="watermark__cover">
        </div>
      </div>
    ) 
  }
}

GoJs.defaultProps = { data: '[]' };