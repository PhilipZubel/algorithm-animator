import {Graph} from './interfaces'

interface SearchEdge {
    from: number,
    to: number,
}

interface Event {
    id: number;
    color: string;
    time: number;
}

const VISITED = "red";
const UPCOMMING = "yellow";

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
        this.addUpcommingdNode(start);
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
                color: VISITED,
                time: this.eventTime,
            })
        }

    }
    addUpcommingdNode(node: number){
        if(!this.upcommingNodes.includes(node)){
            this.upcommingNodes.push(node);
            this.events.push({
                id: node,
                color: UPCOMMING,
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

    getAllEvetns(): Event[] {
        return JSON.parse(JSON.stringify(this.events));
    }

    // printNodes() {
    //     console.log("visited")
    //     console.log(this.visitedNodes)
    //     console.log("upcomming")
    //     console.log(this.upcommingNodes)
    // }
}

const breadthFirstTraversal = (graph: Graph, startingEdge: number) => {
    const bft = new BreadthFirstTraversal(graph, startingEdge);
    while(!bft.isSearchDone()){ 
        bft.addEvents();
        // bft.printNodes()
    }
    return bft.getAllEvetns();
}

export { breadthFirstTraversal };
export type { Event };

