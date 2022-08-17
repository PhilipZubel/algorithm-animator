import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSort = (props: {sortType: string, handleChange: (params:any)  => void, types: string[], active:boolean}) => {
  
  return (
      <FormControl size="small" disabled={props.active}>
        <InputLabel id="demo-simple-select-label" color="primary">Algorithms</InputLabel>
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