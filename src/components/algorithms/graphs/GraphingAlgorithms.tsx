import { Button, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react'
import Dashboard from './Dashboard';
import {v4 as uuidv4} from 'uuid';
import {Graph, Edge, Node} from './interfaces';
import DeleteNodeForm from './DeleteNodeForm';
import AddEdgeForm from './AddEdgeForm';
import DeleteEdgeForm from './DeleteEdgeForm';

const GraphingAlgorithms = () => {

  const intialGraph: Graph = {
    nodes: [
      // { id: 1, label: "Node 1", title: "" },
      // { id: 2, label: "Node 2", title: "" },
      // { id: 3, label: "Node 3", title: "" },
      // // { id: 4, label: "Node 4", title: "node 4 tootip text" },
      // { id: 5, label: "Node 5", title: "" },
      // { id: 6, label: "Node 6", title: "" }
    ],
    edges: [
      // { from: 1, to: 2 },
      // { from: 1, to: 3 },
      // // { from: 2, to: 4 },
      // { from: 2, to: 5 },
      // { from: 5, to: 6 },
    ]
  };

  const [graph, setGraph] = useState<Graph>(intialGraph)
  const [graphKey, setGraphKey] = useState<string>(uuidv4());
  const [removedNode, setRemovedNode] = useState<number>(-1);
  const [newEdgeNodes, setNewEdgeNodes] = useState<number[]>([]);
  const [edgeRemoved, setEdgeRemoved] = useState<Edge>({} as Edge);

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
      title: ""
    }
    let newNodes = [...graph.nodes, newNode];
    setGraph({nodes:newNodes, edges: graph.edges}) 
    updateGraph();
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
          to: parseInt(arr[1])
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
  
  return (
      <>
      <div hidden={true}>GraphingAlgorithms</div>
      <Button onClick={addNode}>Add Node</Button>
      <DeleteNodeForm 
        graph={graph} 
        removedNode={removedNode} 
        setRemovedNode={setRemovedNode}/>
      <Button onClick={deleteNode}>Delete Node</Button>
      <AddEdgeForm 
        nodes={graph.nodes} 
        newEdgeNodes={newEdgeNodes} 
        setNewEdgeNodes={setNewEdgeNodes}
        handleChangeEdgeNodes={handleChangeEdgeNodes} 
        />
      <Button onClick={addEdge}>Add Edge</Button>
      <DeleteEdgeForm 
        edges={graph.edges}
        edgeRemoved={edgeRemoved} 
        handleChangeEdgeRemoved={handleChangeEdgeRemoved}
        />
      <Button onClick={deleteEdge}>Delete Edge</Button>
      <Dashboard graph={graph} graphKey={graphKey}/>
      </>
  )
}

export default GraphingAlgorithms;