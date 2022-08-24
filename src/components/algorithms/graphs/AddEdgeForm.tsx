import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Node} from './Interfaces'

const AddEdgeForm = (props: {
    nodes:Node[], 
    newEdgeNodes:number[], 
    setNewEdgeNodes: (arg0: any) => void, 
    handleChangeEdgeNodes : (idx: number, nodeId: number) => void,
    isRunning: boolean,
    }) => {

    const handleChangeEdgeFrom = (event: SelectChangeEvent) => {
        const id = parseInt(event.target.value);
        console.log(id)
        props.handleChangeEdgeNodes(0, id);
    }
    
    const handleChangeEdgeTo = (event: SelectChangeEvent) => {
        const id = parseInt(event.target.value);
        props.handleChangeEdgeNodes(1, id);
    }

    return (
    <>
        <FormControl sx={{width: 160, mb: 1}} size="small">
        <InputLabel id="edge-from-select-label" >Edge From</InputLabel>
        <Select
            labelId="edge-from-select-label"
            id="edge-from-select"
            value={props.newEdgeNodes[0] === 0 ? "" : props.newEdgeNodes[0].toString()}
            label="From"
            onChange={handleChangeEdgeFrom}
            disabled={props.isRunning}
        >
            {props.nodes.map(node => 
            <MenuItem
                key={node.id}
                value={node.id}
            >
            {node.label}
            </MenuItem>)
            }

        </Select>
        </FormControl>
        <FormControl sx={{width: 160, mb: 1}} size="small">
        <InputLabel id="edge-to-select-label" >Edge To</InputLabel>
        <Select
            labelId="edge-to-select-label"
            id="edge-to-select"
            value={props.newEdgeNodes[1] === 0 ? "" : props.newEdgeNodes[1].toString()}
            label="To"
            onChange={handleChangeEdgeTo}
            disabled={props.isRunning}
        >
            {props.nodes.map(node => 
            <MenuItem
                key={node.id}
                value={node.id}
            >
            {node.label}
            </MenuItem>)
            }

        </Select>
        </FormControl>
    </>
    );
}

export default AddEdgeForm;