import { Button, Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Dashboard from './Dashboard';
import {v4 as uuidv4} from 'uuid';
import {Graph, Edge, Node, Color} from './interfaces';
import {depthFirstSearch, Event} from './Algorithms'
import DeleteNodeForm from './DeleteNodeForm';
import AddEdgeForm from './AddEdgeForm';
import DeleteEdgeForm from './DeleteEdgeForm';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import {COLORS, intialGraph} from './InitialGraph';
import { breadthFirstTraversal } from './Algorithms';


const GraphingAlgorithms = () => {

  const [graph, setGraph] = useState<Graph>(intialGraph)
  const [graphKey, setGraphKey] = useState<string>(uuidv4());
  const [removedNode, setRemovedNode] = useState<number>(-1);
  const [newEdgeNodes, setNewEdgeNodes] = useState<number[]>([]);
  const [edgeRemoved, setEdgeRemoved] = useState<Edge>({} as Edge);
  const events = useRef<Event[]>([])

  // useEffect(() => {
  //   if(events.length > 0){
  //     startSimulation()
  //   }  
  // }, [events])

  const startSimulation = () => {
    if(events.current.length > 0) {
      const lastEvent = events.current[events.current.length - 1].time;
      for(let i=0; i<=lastEvent; i++){
        setTimeout(() => getCurrentEvents(i), 1000 * i);
      }
        // setTimeout(getCurrentEvents, 1000);
    }
    
  }

  const getCurrentEvents = (curTime: number) => {
    let isCurTime = true;
    let curEvents = events.current.filter(e => e.time <= curTime);
    changeColor(curEvents)
  }


  // useEffect(() => {
  //   let interval:any = null;
  //   if(events.length > 0){
  //     for(let i=0; i< 5; i++){
  //       let curEvents = [events[eventIdx.current++]]
  //       changeColor(curEvents)
  //       setTimeout(function() {
  //         console.log("Good Night!");
  //       }, 1000);
  //     }
  //   }
    

  //   // if(events.length > 0 && eventIdx.current < 5){
  //   //   let time = 0;
  //   //   interval = setInterval(() =>{
  //   //     if(eventIdx.current === temp) {
  //   //       clearInterval(interval)
  //   //     }
  //   //     let curEvents = [events[eventIdx.current++]]
  //   //     changeColor(curEvents)
  //   //   }, 1000)
  //   // }
  //   // if(events.length > 0){
  //   //   let time = events[eventIdx.current].time;
  //   //   interval = setInterval(() => {
  //   //     let isCurTime = true;
  //   //     let curEvents: Event[] = [];
  //   //     while(flag && events.length > eventIdx.current){
  //   //       const event = events[eventIdx.current];
  //   //       if(event.time === time){
  //   //         curEvents.push(event)
  //   //         eventIdx.current++;
  //   //       }else{
  //   //         flag = false;
  //   //       }
  //   //     }
  //   //     changeColor(curEvents);
  //   //     time++;
  //   //     console.log(events.length, eventIdx.current)
  //   //     if(curEvents.length === 0 || events.length <= eventIdx.current){
  //   //       clearInterval(interval);
  //   //       eventIdx.current = 0;
  //   //     }
  //   //   }, 1000)
  //   // }
  // },[events])

  const changeColor = (curEvents: Event[]) => {
    let newNodes: Node[] = JSON.parse(JSON.stringify(graph.nodes));
    curEvents.forEach(e => {
      let element: Node|undefined = newNodes.find(node => node.id === e.id);
      if(element){
        element.color = e.color
      }
    })
    // newGraph.nodes[temp.current].color = "blue";
    // console.log(graph)
    // temp.current++;
    setGraph({nodes:newNodes, edges: graph.edges}) 
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

  const handleChangeEdgeNodes = (event: SelectChangeEvent<number[]>) => {
    const { target: { value }, } = event;    
    let newEdgeNodes = typeof value === "string" ? value.split(',').map(e => parseInt(e)) : value;
    if(newEdgeNodes.length > 2){
        newEdgeNodes = newEdgeNodes.slice(-2).sort((a,b) => a-b)
    }
    setNewEdgeNodes(newEdgeNodes);
  };

  const addEdge = () => {
    if(newEdgeNodes.length !== 2) return;
    const newEdge: Edge = {
      from : newEdgeNodes[0],
      to : newEdgeNodes[1],
      color: {} as Color,
    } 
    const existingEdge = graph.edges.find(edge => edge.from === newEdge.from && edge.to === newEdge.to);
    if(existingEdge !== undefined) return;
    let edges = [...graph.edges]
    edges.push(newEdge)
    setGraph({nodes: graph.nodes, edges: edges})
    updateGraph();
    setNewEdgeNodes([]);
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
    events.current = depthFirstSearch(JSON.parse(JSON.stringify(graph)), 1)
    // console.log(events.current)
    startSimulation();
    // setEvents(events);
  }

  const resetColors = () => {
    let nodes: Node[] =JSON.parse(JSON.stringify(graph.nodes));
    nodes.map( node => node.color = COLORS.default)
    setGraph({nodes: nodes, edges: graph.edges})
  }
  
  return (
      <>
      <div hidden={true}>GraphingAlgorithms</div>
      <Grid container rowSpacing={1} columnSpacing={1} spacing={2}>
        <Grid item xs={12} id ="node-section">
          <Button variant="contained" onClick={addNode} endIcon={<AddIcon />}>
            Node
          </Button>
          <DeleteNodeForm 
            graph={graph} 
            removedNode={removedNode} 
            setRemovedNode={setRemovedNode}/>
          <Button variant="contained" onClick={deleteNode} endIcon={<ClearIcon />}>
            Node
          </Button>
          </Grid>
        <Grid item xs={12} id="edge-add">
          <AddEdgeForm 
          nodes={graph.nodes} 
          newEdgeNodes={newEdgeNodes} 
          setNewEdgeNodes={setNewEdgeNodes}
          handleChangeEdgeNodes={handleChangeEdgeNodes} 
          />
          <Button variant="contained" onClick={addEdge} endIcon={<AddIcon />}>
            Edge
          </Button>
        </Grid>
        <Grid item xs={12} id="edge-delete">
          <DeleteEdgeForm 
            edges={graph.edges}
            edgeRemoved={edgeRemoved} 
            handleChangeEdgeRemoved={handleChangeEdgeRemoved}
          />
          <Button variant="contained" onClick={deleteEdge} endIcon={<ClearIcon />}>
          Edge
          </Button>
        </Grid>
      </Grid>
      <Button onClick={startAlgorithm}>Start</Button>
      <Button onClick={resetColors}>Reset</Button>
      <div id="graph-dashboard">
        <Dashboard graph={graph} graphKey={graphKey}/>
      </div>
      
      </>
  )
}

export default GraphingAlgorithms;