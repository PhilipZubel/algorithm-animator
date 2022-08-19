interface Node {
    id: number,
    label: string,
    title: string,
  }

interface Edge {
  from: number,
  to: number,
}

interface Graph {
  nodes: Node[],
  edges: Edge[],
}

export type {Node, Edge, Graph};