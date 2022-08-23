import {Graph, Color} from './Interfaces'

import { indigo, blue } from '@mui/material/colors';

const COLORS = {
    default: indigo[400],
    upcomming: blue[300],
    visited: blue[800],
}

const intialGraph: Graph = {
    nodes: [
        { id: 1, label: "Node 1", title: "", color: COLORS.default },
        { id: 2, label: "Node 2", title: "", color: COLORS.default },
        { id: 3, label: "Node 3", title: "", color: COLORS.default },
        { id: 4, label: "Node 4", title: "", color: COLORS.default },
        { id: 5, label: "Node 5", title: "", color: COLORS.default },
        { id: 6, label: "Node 6", title: "", color: COLORS.default },
        { id: 7, label: "Node 7", title: "", color: COLORS.default },
    ],
    edges: [
        { from: 1, to: 2,  color: {} as Color},
        { from: 1, to: 3 , color: {} as Color },
        { from: 1, to: 4 , color: {} as Color},
        { from: 2, to: 4 , color: {} as Color},
        { from: 2, to: 5 , color: {} as Color},
        { from: 3, to: 6 , color: {} as Color},
        { from: 4, to: 7 , color: {} as Color},
        { from: 5, to: 6 , color: {} as Color},
    ]
};

export {intialGraph, COLORS};