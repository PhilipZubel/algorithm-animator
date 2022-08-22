import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import {Graph} from './interfaces';

const DeleteNodeForm = (props: {graph:Graph, removedNode:number, setRemovedNode:(params:any)  => void}, ) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="old-node-label">Delete</InputLabel>
        <Select
          labelId="old-node-label"
          id="old-node-select"
          value={props.removedNode === -1 ? "" : props.removedNode.toString()}
          label="Deleted Node"
          onChange={(event: SelectChangeEvent) => props.setRemovedNode(event.target.value === "" ? -1 : parseInt(event.target.value))}
        >
          {props.graph.nodes.map(node => {
            return <MenuItem key={node.id} value={node.id}>{node.label}</MenuItem>
          })}
        </Select>
      </FormControl>
  )
}

export default DeleteNodeForm;