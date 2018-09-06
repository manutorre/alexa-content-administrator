import React, {Component} from 'react';
import go from 'gojs';
const goObj = go.GraphObject.make;

const funcionn = () => {
  console.log("jejeje")
}

const data = [
  {
    title:"noticia",
    from:null,
    to:null
  },
  {
    title:"noticia",
    from:null,
    to:null
  }
]

export default class GoJs extends Component {

  constructor (props) {
    super (props);
    console.log(this.props.data)
    this.renderCanvas = this.renderCanvas.bind (this);
    this.state = {
      actualData: [
        {
          title:"noticia",
          from:null,
          to:null
        },
        {
          title:"noticia",
          from:null,
          to:null
        }
      ],
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
  
  addContent(content){
    let currentData = this.state.actualData
    currentData.push(content)
    this.setState({actualData:currentData})
  }

  generateNodeTemplate(){
    let nodeTemplate = goObj(
      go.Node,
     "Auto",
      new go.Binding('location'),
      goObj(
        go.Shape, "Rectangle",
        {portId: "", fromLinkable: true, toLinkable: true},
        new go.Binding("fill", "color")
      ),
      goObj(
        go.TextBlock,
        { margin: 6, font: "18px sans-serif" },
        new go.Binding("text", "key")
      )
    )
    return nodeTemplate;    
  }

  generateLinkTemplate(){
    let linkTemplate = goObj(go.Link,
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
    diagram.addDiagramListener("ObjectDoubleClicked",  (ev) => {
      console.log(ev); //Successfully logs the node you clicked.
      console.log(ev.subject.part); //Successfully logs the node's name.
      ev.diagram.model.addLinkData({from:ev.subject.part.key, to:ev.diagram.model.nodeDataArray[0].key})
      console.log(ev.diagram.model.linkDataArray)
      data.push(ev.subject.part.key)
      console.log(data)
    });
    this.setModelAndDiagram(model, diagram)
  
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
    diagram.model = new go.GraphLinksModel(this.props.data, linksArray);
    diagram.nodeTemplate = this.generateNodeTemplate()
    diagram.linkTemplate = this.generateLinkTemplate()
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
      key: event.dataTransfer.items[0].type,
      color: "lightyellow"
    });
    diagram.commitTransaction('new node');
    this.setState({
      myDiagram:diagram,
      myModel:diagram.model
    })
    console.log(this.state)
    // remove dragged element from its old location
    // if (remove.checked) dragged.parentNode.removeChild(dragged);    
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
    // var can = event.target;
    
    // window.PIXELRATIO = this.state.myDiagram.computePixelRatio();
    // let pixelratio = window.PIXELRATIO;

    // // if the target is not the canvas, we may have trouble, so just quit:
    // if (!(can instanceof HTMLCanvasElement)) return;

    // var bbox = can.getBoundingClientRect();
    // var bbw = bbox.width;
    // if (bbw === 0) bbw = 0.001;
    // var bbh = bbox.height;
    // if (bbh === 0) bbh = 0.001;
    // var mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
    // var my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
    // var point = this.state.myDiagram.transformViewToDoc(new go.Point(mx, my));
    // var curnode = this.state.myDiagram.findPartAt(point, true);
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