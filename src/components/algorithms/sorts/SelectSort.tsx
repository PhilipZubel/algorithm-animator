import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const types: string[] = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort"
]

const SelectSort = () => {
  const [sortType, setSortType] = useState<string>(types[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  return (
      <FormControl size="small" >
        <InputLabel id="demo-simple-select-label" color="primary">Algorithm</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortType}
          label="Sorting Algorithm"
          onChange={handleChange}
        >
            {types.map(sort => {
                return <MenuItem key={sort} value={sort}>{sort}</MenuItem>
            })}
        </Select>
      </FormControl>
  );
}

export default SelectSort