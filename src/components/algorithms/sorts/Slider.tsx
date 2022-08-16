import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import React, { useState } from 'react';

const RangeSlider = (props : {sliderValue:number, handleChange: (params:any)  => void, active:boolean}) => {

    return (
        <Slider
        valueLabelDisplay="auto"
        step={5}
        min={10}
        max={100}
        onChange={props.handleChange}
        value={props.sliderValue}
        disabled={props.active}
        />
)
    
}

export default RangeSlider;