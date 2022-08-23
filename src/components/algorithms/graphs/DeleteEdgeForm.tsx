import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {Edge} from './Interfaces'

const DeleteEdgeForm = (props: {
    edges: Edge[], 
    edgeRemoved: Edge, 
    handleChangeEdgeRemoved: (arg0: SelectChangeEvent) => void,
    isRunning: boolean,
    }) => {

    let value = props.edgeRemoved.from ?`${props.edgeRemoved.from}-${props.edgeRemoved.to}`:''

    return (
        <FormControl sx={{width: 160, mb:1}} size="small">
            <InputLabel id="delete-edge-label">Delete Edge</InputLabel>
            <Select
                labelId="delete-edge-label"
                id="delete-edge-select"
                value={value}
                label="Delete Edge"
                onChange={props.handleChangeEdgeRemoved}
                disabled={props.isRunning}
            >
            {props.edges.map( e => {
                const edge = `${e.from}-${e.to}`
                const edgeSpaced = `${e.from} - ${e.to}`
                return  <MenuItem key={edge} value={edge}>{edgeSpaced}</MenuItem>
            })}
            </Select>
        </FormControl>
    );
}

export default DeleteEdgeForm;