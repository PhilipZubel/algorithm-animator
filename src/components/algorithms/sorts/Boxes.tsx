import { Box } from '@mui/material'
import React, {useLayoutEffect, useEffect} from 'react'
import { ColorChange } from './sorts';

const MIN_COLOR = 220;
const MAX_COLOR = 150;
const calculateColor = (num:number, total:number): string => {
    const value = Math.round(MIN_COLOR -  num / total * (MIN_COLOR-MAX_COLOR))
    return `rgb(${value},${value},${value})`
}

const Boxes = (props : {values:number[], highlightedBars:ColorChange[]}) => {

    const [dimensions, setDimensions] = React.useState([ 
        window.innerWidth,
        window.innerHeight
    ])

    useLayoutEffect(() => {
        function updateSize() {
            setDimensions([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    return (
        <div style={{ width: '90%', margin:"auto" }}>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: "flex-end",
            mt: 5,
            bgcolor: 'background.paper',
            borderRadius: 1,
            height: dimensions[1] * 0.6
            }}
        >
        {props.values.map((value:number, idx:number) => {
            const event = props.highlightedBars.find(e => e.valueIndex === idx);
            const color: string = event ? 'primary.dark' : calculateColor(value, props.values.length);
            // const color: string = calculateColor(value, props.values.length);
            return (
                <Box 
                    key={value}
                    sx={{
                    height: value/props.values.length * dimensions[1] * 0.6,
                    width: dimensions[0] * 0.9 / props.values.length,
                    backgroundColor: color,
                }}></Box>
            )
        })}
        </Box>
        </div>
    )
}

export default Boxes;