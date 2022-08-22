import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, {useState} from 'react'
import {Edge} from './interfaces'

const DeleteEdgeForm = (props: {
    edges: Edge[], 
    edgeRemoved: Edge, 
    handleChangeEdgeRemoved: (arg0: SelectChangeEvent) => void
    }) => {

    return (
        <FormControl sx={{width: 120}} size="small">
            <InputLabel id="delete-edge-label">Delete Edge</InputLabel>
            <Select
                labelId="delete-edge-label"
                id="delete-edge-select"
                value={`${props.edgeRemoved.from}-${props.edgeRemoved.to}`}
                label="Delete Edge"
                onChange={props.handleChangeEdgeRemoved}
            >
            {props.edges.map( e => {
                const edge = `${e.from}-${e.to}`
                const edgeSpaced = `${e.from} - ${e.to}`
                return  <MenuItem value={edge}>{edgeSpaced}</MenuItem>
            })}
            </Select>
        </FormControl>
    );
}

export default DeleteEdgeForm;