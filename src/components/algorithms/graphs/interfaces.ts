interface Node {
    id: number,
    label: string,
    title: string,
  }

interface Color {
  color: string,
  highlight: string,
  hover:  string,
  inherit: string,
  opacity: number,
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


export type {Node, Edge, Graph, Color};