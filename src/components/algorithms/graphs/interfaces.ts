interface Node {
    id: number,
    label: string,
    title: string,
    color: string,
  }

interface Edge {
  from: number,
  to: number,
  color: Color,
}

interface Graph {
  nodes: Node[],
  edges: Edge[],
}

interface Color {
  color: string,
  highlight: string,
  hover:  string,
  inherit: string,
  opacity: number,
}


export type {Node, Edge, Graph, Color};