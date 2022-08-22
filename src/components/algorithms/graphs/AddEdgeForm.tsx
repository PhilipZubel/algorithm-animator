import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {Node} from './interfaces'


const AddEdgeForm = (props: {
    nodes:Node[], newEdgeNodes:number[], 
    setNewEdgeNodes: (arg0: any) => void, 
    handleChangeEdgeNodes : (event: SelectChangeEvent<number[]>) => void,
    }) => {

    return (
    <>
        <FormControl sx={{width: 210}} size="small">
        <InputLabel id="demo-multiple-chip-label">Add Edge</InputLabel>
        <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={props.newEdgeNodes}
            onChange={props.handleChangeEdgeNodes}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                <Chip key={value} label={`Node ${value}`} />
                ))}
            </Box>
            )}
        >
            {props.nodes.map((node) => (
            <MenuItem
                key={node.id}
                value={node.id}
            >
            {node.label}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    </>
    );
}

export default AddEdgeForm;