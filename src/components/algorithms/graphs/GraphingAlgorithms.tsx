import { Button, Grid, SelectChangeEvent } from '@mui/material';
import { useRef, useState } from 'react'
import Dashboard from './Dashboard';
import {v4 as uuidv4} from 'uuid';
import {Graph, Edge, Node, Color} from './interfaces';
import {depthFirstSearch, breadthFirstTraversal, Event} from './Algorithms'
import DeleteNodeForm from './DeleteNodeForm';
import AddEdgeForm from './AddEdgeForm';
import DeleteEdgeForm from './DeleteEdgeForm';

import {COLORS, intialGraph} from './InitialGraph';
import AlgorithmSelectorForm from './AlgorithmSelectorForm';

const algorithms: {[key: string]: any} = {
  "Breadth First Traversal": breadthFirstTraversal,
  "Depth First Search": depthFirstSearch,
}

const GraphingAlgorithms = () => {

  const [graph, setGraph] = useState<Graph>(intialGraph)
  const [graphKey, setGraphKey] = useState<string>(uuidv4());
  const [removedNode, setRemovedNode] = useState<number>(-1);
  const [newEdgeNodes, setNewEdgeNodes] = useState<number[]>([0,0]);
  const [edgeRemoved, setEdgeRemoved] = useState<Edge>({} as Edge);
  const [algorithm, setAlgorithm] = useState<string>(Object.keys(algorithms)[0]);
  const events = useRef<Event[]>([]);

  const startSimulation = () => {
    const getCurrentEvents = (curTime: number) => {
      let curEvents = events.current.filter(e => e.time <= curTime);
      changeColor(curEvents)
    }

    const changeColor = (curEvents: Event[]) => {
      let newNodes: Node[] = JSON.parse(JSON.stringify(graph.nodes));
      curEvents.forEach(e => {
        let element: Node|undefined = newNodes.find(node => node.id === e.id);
        if(element){
          element.color = e.color
        }
      })
      setGraph({nodes:newNodes, edges: graph.edges}) 
    }

    if(events.current.length > 0) {
      const lastEvent = events.current[events.current.length - 1].time;
      for(let i=0; i<=lastEvent; i++){
        setTimeout(() => getCurrentEvents(i), 1000 * i);
      }
    }  
  }

  const updateGraph = () => {
    setGraphKey(uuidv4())
  }

  const addNode = () => {
    let indices = graph.nodes.map(e => e.id).sort((a,b) => a-b)
    let newId = 1;
    while(indices.length >= newId && newId === indices[newId-1]) newId++;
    const newNode: Node = {
      id: newId,
      label: `Node ${newId}`,
      title: "",
      color: COLORS.default,
    }
    let newNodes = [...graph.nodes, newNode];
    setGraph({nodes:newNodes, edges: graph.edges}) 
    updateGraph()
  }

  const deleteNode = () => {
    if(removedNode === -1) return;
    // delete edges for that node
    const edgesToBeRemoved = graph.edges.filter(edge => edge.from === removedNode || edge.to === removedNode)
    let newEdges = [...graph.edges]
    edgesToBeRemoved.forEach(edge => {
      const index = newEdges.findIndex(e => e === edge);
      newEdges.splice(index, 1);
    });
    // delete node
    const index = graph.nodes.findIndex(node => node.id === removedNode);
    let newNodes = [...graph.nodes]
    newNodes.splice(index, 1);
    setGraph({nodes:newNodes, edges: newEdges})
    setRemovedNode(-1) 
  }

  const handleChangeEdgeNodes = (idx:number, number:number) => {
    if(idx === 0){
      setNewEdgeNodes([number, newEdgeNodes[1]])
    }else{
      setNewEdgeNodes([newEdgeNodes[0], number])
    }
  };

  const addEdge = () => {
    if(newEdgeNodes.length !== 2 || newEdgeNodes[0] === newEdgeNodes[1] || newEdgeNodes[0] === 0 || newEdgeNodes[1] === 0) return;
    const newEdge: Edge = {
      from : newEdgeNodes[0],
      to : newEdgeNodes[1],
      color: {} as Color,
    } 
    console.log(newEdge)
    const existingEdge = graph.edges.find(edge => edge.from === newEdge.from && edge.to === newEdge.to);
    if(existingEdge !== undefined) return;
    let edges = [...graph.edges]
    edges.push(newEdge);
    setGraph({nodes: graph.nodes, edges: edges})
    updateGraph();
    setNewEdgeNodes([0,0]);
  }

  const handleChangeEdgeRemoved = (event: SelectChangeEvent) => {
    const arr = event.target.value.split('-')
    const edge: Edge = {
        from: parseInt(arr[0]),
        to: parseInt(arr[1]),
        color: {} as Color,
    }
    setEdgeRemoved(edge);
  };

  const handleChangeAlgorithm = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value);
  }

  const deleteEdge = () => {
    if(!edgeRemoved) return;
    let newEdges = [...graph.edges];
    const idxToBeRemoved = newEdges.findIndex(edge => edge.from === edgeRemoved.from && edge.to === edgeRemoved.to)
    newEdges.splice(idxToBeRemoved, 1);
    setGraph({nodes: graph.nodes, edges: newEdges})
    updateGraph();
    setEdgeRemoved({} as Edge);
  }

  const startAlgorithm = () => {
    if(algorithm === "") return;
    events.current = algorithms[algorithm](JSON.parse(JSON.stringify(graph)), 1)
    startSimulation();
  }

  const resetColors = () => {
    let nodes: Node[] = JSON.parse(JSON.stringify(graph.nodes));
    nodes.map( node => node.color = COLORS.default)
    setGraph({nodes: nodes, edges: graph.edges})
  }
  
  return (
      <>
      <div hidden={true}>GraphingAlgorithms</div>
      <Grid 
        container 
        id="algorithms-menu"
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        my={2}
        >
        <Grid item xs={12} sm={4} lg={3} className="algorithms-col" >
          <Button variant="outlined" onClick={addNode} sx={{mb:1}}>
            Add Node
          </Button>
          <DeleteNodeForm 
            graph={graph} 
            removedNode={removedNode} 
            setRemovedNode={setRemovedNode}/>
          <Button 
            variant="outlined" 
            onClick={deleteNode}
            sx={{mb:2}}
            disabled={removedNode === -1}>
            Delete Node
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className="algorithms-col">
          <AddEdgeForm 
            nodes={graph.nodes} 
            newEdgeNodes={newEdgeNodes} 
            setNewEdgeNodes={setNewEdgeNodes}
            handleChangeEdgeNodes={handleChangeEdgeNodes} 
            />
          <Button 
            variant="outlined" 
            onClick={addEdge}
            sx={{mb:2}}
            disabled={newEdgeNodes[0] === 0 || newEdgeNodes[1] === 0}>
            Add Edge
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className="algorithms-col">
          <DeleteEdgeForm 
              edges={graph.edges}
              edgeRemoved={edgeRemoved} 
              handleChangeEdgeRemoved={handleChangeEdgeRemoved}
            />
          <Button 
            variant="outlined" 
            onClick={deleteEdge}
            sx={{mb:2}}
            disabled={edgeRemoved.from === undefined}>
          Delete Edge
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} lg={3} className="algorithms-col">
        <AlgorithmSelectorForm 
          value={algorithm} 
          items={Object.keys(algorithms)} 
          setAlgorithm={handleChangeAlgorithm}/>
          <div id="graph-buttons">
            <Button onClick={startAlgorithm} variant="contained">Start</Button>
            <Button onClick={resetColors} variant="contained">Reset</Button>
          </div>
        </Grid>
      </Grid>
      <div id="graph-dashboard">
        <Dashboard graph={graph} graphKey={graphKey}/>
      </div>
      </>
  )
}

export default GraphingAlgorithms;