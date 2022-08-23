import {Graph, Node} from './Interfaces'
import {COLORS} from './InitialGraph'

interface SearchEdge {
    from: number,
    to: number,
}

interface Event {
    id: number;
    color: string;
    time: number;
}


class BreadthFirstTraversal {
    private edges: SearchEdge[];
    private visitedNodes: number[];
    private upcommingNodes: number[];
    
    private events: Event[];
    private eventTime: number;

    constructor(graph: Graph, start: number){
        this.edges = graph.edges.map(edge => {
            return {
                from: edge.from,
                to: edge.to,
            }
        });
        this.visitedNodes = [];
        this.upcommingNodes = [];
        this.events = []
        this.eventTime = 0;
        this.setup(graph.nodes)
        this.addUpcommingdNode(start);
        this.eventTime++;
    }

    setup(nodes: Node[]):void {
        nodes.map(n => n.id)
            .forEach(id => this.events.push({
                id: id,
                color: COLORS.default,
                time: this.eventTime,
            }))
        this.eventTime++;
    }

    isSearchDone(): boolean{
        const curNode = this.upcommingNodes[0];
        return !curNode && this.getNextNodes().length === 0;
    }

    getNextNodes(): number[] {
        const curNode = this.upcommingNodes[0];
        return this.edges
            .filter(e => e.from === curNode)
            .filter(e => !this.visitedNodes.includes(e.to))
            .map(e => e.to);
    }

    addVisitedNode(){
        const node = this.upcommingNodes.shift();
        if(node){
            this.visitedNodes.push(node); 
            this.events.push({
                id: node,
                color: COLORS.visited,
                time: this.eventTime,
            })
        }

    }
    addUpcommingdNode(node: number){
        if(!this.upcommingNodes.includes(node)){
            this.upcommingNodes.push(node);
            this.events.push({
                id: node,
                color: COLORS.upcomming,
                time: this.eventTime,
            })
        }
    }

    addEvents(): void {
        const upcommingNodes = this.getNextNodes()
        this.addVisitedNode();
        upcommingNodes.forEach(node => this.addUpcommingdNode(node));
        this.eventTime++;

    }

    getAllEvents(): Event[] {
        return JSON.parse(JSON.stringify(this.events));
    }

}

const breadthFirstTraversal = (graph: Graph, startingEdge: number) => {
    const bft = new BreadthFirstTraversal(graph, startingEdge);
    while(!bft.isSearchDone()){ 
        bft.addEvents();
    }
    return bft.getAllEvents();
}

class DepthFirstSearch {
    private edges: SearchEdge[];
    private visitedNodes: number[];
    private upcommingNodes: number[];
    
    private events: Event[];
    private eventTime: number;

    constructor(graph: Graph, start: number){
        this.edges = graph.edges.map(edge => {
            return {
                from: edge.from,
                to: edge.to,
            }
        })
        this.visitedNodes = [];
        this.upcommingNodes = [];
        this.events = [];
        this.eventTime = 0;
        this.setup(graph.nodes)
        this.addUpcommingdNode(start);
        this.eventTime++;
    }

    setup(nodes: Node[]):void {
        nodes.map(n => n.id)
            .forEach(id => this.events.push({
                id: id,
                color: COLORS.default,
                time: this.eventTime,
            }))
        this.eventTime++;
    }

    addVisitedNode(){
        const node = this.upcommingNodes.shift();
        if(node){
            this.visitedNodes.push(node); 
            this.events.push({
                id: node,
                color: COLORS.visited,
                time: this.eventTime,
            })
        }

    }

    addUpcommingdNode(node: number){
        if(this.visitedNodes.includes(node)) return;
        const idx = this.upcommingNodes.indexOf(node);
        if(idx !== -1){
            this.upcommingNodes.splice(idx, 1);
        }
        this.upcommingNodes.unshift(node);
        this.events.push({
            id: node,
            color: COLORS.upcomming,
            time: this.eventTime,
        })

    }

    isSearchDone(): boolean{
        // const curNode = this.upcommingNodes[0];
        return !this.upcommingNodes[0];
    }

    getNextNodes(): number[] {
        const curNode = this.upcommingNodes[0];
        return this.edges
            .filter(e => e.from === curNode && !this.visitedNodes.includes(e.to))
            .map(e => e.to)      
    }

    addEvents(): void {
        const nextNodes = this.getNextNodes();
        this.addVisitedNode()
        nextNodes.forEach(node => this.addUpcommingdNode(node)) 
        this.eventTime++;   
    }

    getAllEvents(): Event[] {
        return JSON.parse(JSON.stringify(this.events));
    }
}

const depthFirstSearch = (graph: Graph, startingEdge: number) => {
    const dfs = new DepthFirstSearch(graph, startingEdge);
    while(!dfs.isSearchDone()){
        dfs.addEvents();
    }
    return dfs.getAllEvents()
}

export { breadthFirstTraversal, depthFirstSearch };
export type { Event };

