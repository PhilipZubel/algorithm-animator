import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, } from '@mui/material'

function AlgorithmSelectorForm(props: {
    value: string, 
    items: string[], 
    setAlgorithm: (arg0:any) => void,
    isRunning: boolean,
    }) {
    return (
        <FormControl>
            <FormLabel id="algorithms-group-label">Algorithms</FormLabel>
            <RadioGroup
            aria-labelledby="algorithms-group-label"
            defaultValue={props.items[0]}
            name="radio-buttons-group"
        >
            {props.items.map(alg => {
                return <FormControlLabel 
                    key={alg} 
                    value={alg} 
                    control={<Radio onChange={props.setAlgorithm} value={alg}/>} 
                    label={alg}
                    disabled={props.isRunning} />
            })}
            </RadioGroup>
        </FormControl>
    );
}

export default AlgorithmSelectorForm