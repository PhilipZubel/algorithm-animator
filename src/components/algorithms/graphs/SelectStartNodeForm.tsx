import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import {Node} from './Interfaces';

const SelectStartNodeForm = (props: {
    nodes:Node[], 
    startNode:number, 
    setStartNode:(params:any)  => void,
    isRunning:boolean,
}) => {
  return (
    <FormControl sx={{ minWidth: 160, mb: 2 }} size="small">
        <InputLabel id="start-node-label">Starting Node</InputLabel>
        <Select
          labelId="start-node-label"
          id="start-node-select"
          value={props.startNode === -1 ? "" : props.startNode.toString()}
          label="Start Node"
          onChange={(event: SelectChangeEvent) => props.setStartNode(event.target.value === "" ? -1 : parseInt(event.target.value))}
          disabled={props.isRunning}
        >
          {props.nodes.map(node => {
            return <MenuItem key={node.id} value={node.id}>{node.label}</MenuItem>
          })}
        </Select>
      </FormControl>
  )
}

export default SelectStartNodeForm;