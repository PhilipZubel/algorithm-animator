import { useState } from 'react'
import Graph from "react-graph-vis";


const Dashboard = (props:{graph:any, graphKey:string}) => {
 
  const options2 = {
    autoResize: true,
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      width: 1,
      // arrows: {
      //   to: {
      //     enabled: false,
      //   },
      // }
    },
    height: `${Math.round(window.innerHeight * 0.6)}px`,
    nodes: {
      shape: "circle",
      color: "#283593",
      shadow: true,
      font: {
        color: 'white',
        size: 14,
        // align: 'center',
      },
    },
  };

  const [options, setOptions] = useState(options2);

  // const events = {
  //   select: function(event:any) {
  //     var { nodes, edges } = event;
  //   }
  // };
  return (
    <Graph
      key={props.graphKey}
      graph={props.graph}
      options={options}
      // events={events}
      getNetwork={(network:any) => {
        console.log(network)
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
      sx={{
        border: "2px dotted",
      }}
    />
  )
}

export default Dashboard;