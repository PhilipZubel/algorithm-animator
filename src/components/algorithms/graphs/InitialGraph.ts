import {Graph, Color} from './interfaces'

const color: Color = {
    color: '#ff4141',
    highlight: '#ff4141',
    hover: '#ff4141',
    inherit: 'from',
    opacity: 1.0,
}

const intialGraph: Graph = {
    nodes: [
        { id: 1, label: "Node 1", title: "", color: "green" },
        { id: 2, label: "Node 2", title: "", color: "green" },
        { id: 3, label: "Node 3", title: "", color: "green" },
        { id: 4, label: "Node 4", title: "", color: "green" },
        { id: 5, label: "Node 5", title: "", color: "green" },
        { id: 6, label: "Node 6", title: "", color: "green" },
        { id: 7, label: "Node 7", title: "", color: "green" },
    ],
    edges: [
        { from: 1, to: 2,  color: color},
        { from: 1, to: 3 , color: {} as Color },
        { from: 1, to: 4 , color: {} as Color},
        { from: 2, to: 4 , color: {} as Color},
        { from: 2, to: 5 , color: {} as Color},
        { from: 3, to: 6 , color: {} as Color},
        { from: 4, to: 7 , color: {} as Color},
        { from: 5, to: 6 , color: {} as Color},
    ]
};

export {intialGraph};