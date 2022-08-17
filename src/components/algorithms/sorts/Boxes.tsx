import { Box } from '@mui/material'
import React, {useLayoutEffect} from 'react'
import { ColorChange } from './sorts';

const MIN_COLOR = 210;
const MAX_COLOR = 140;
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
                bgcolor: 'rgb(250,250,250)',
                // borderRadius: 2,
                height: dimensions[1] * 0.6
            }}
        >
        {props.values.map((value:number, idx:number) => {
            const event = props.highlightedBars.find(e => e.valueIndex === idx);
            const color: string = event ? '#283593' : calculateColor(value, props.values.length);
            return (
                <Box 
                    key={`${value}-${idx}`}
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