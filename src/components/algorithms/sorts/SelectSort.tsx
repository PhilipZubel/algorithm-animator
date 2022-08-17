import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const SelectSort = (props: {sortType: string, handleChange: (params:any)  => void, types: string[]}) => {
  

  return (
      <FormControl size="small" >
        <InputLabel id="demo-simple-select-label" color="primary">Algorithm</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sortType}
          label="Sorting Algorithm"
          onChange={props.handleChange}
        >
            {props.types.map(sort => {
                return <MenuItem key={sort} value={sort}>{sort}</MenuItem>
            })}
        </Select>
      </FormControl>
  );
}

export default SelectSort