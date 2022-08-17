import { Box, Button, SelectChangeEvent } from '@mui/material'
import React, {useState, useEffect, useRef} from 'react'
import RangeSlider from './Slider'
import SortIcon from '@mui/icons-material/Sort';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import SelectSort from './SelectSort';
import Boxes from './Boxes';
import {bubbleSort, shuffleArray, ColorChange, SortingEvents, selectionSort, insertionSort } from './sorts';

const types: { [name: string]: (params:number[])  => SortingEvents } = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort,
}


const SortingAlgorithms = () => {

  const [values, setValues] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(20);
  const [sortType, setSortType] = useState<string>(Object.keys(types)[0]);

  const [isSortActive, setSortActive] = useState<boolean>(false);
  const [isSortPaused, setSortPaused] = useState<boolean>(true);
  
  const [highlightedBars, setHighlightedBars] = useState<ColorChange[]>([]);
  let events = useRef<SortingEvents>({} as SortingEvents);
  let eventSize = useRef<number>(0);
  let eventIdx = useRef<number>(0);

  const handleChangeSliderValue = (event:any) => {
    const newValue:number = event.target.value;
    if(newValue !== sliderValue){
        setSliderValue(newValue);
    }
  }

  const handleChangeSortType = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  useEffect(() => {
    setValues(Array.from({length: sliderValue}, (_, index) => index + 1))
  }, [sliderValue]);

  useEffect(() => {
    let interval:any = null;
    if (isSortActive && isSortPaused === false) {
      interval = setInterval(() => {
        if(eventIdx.current>=eventSize.current){
          resetArray();
        }else{
          setHighlightedBars(events.current.colorChanges.filter(value => value.timeIndex === eventIdx.current));
          setValues(events.current.arrays[eventIdx.current]);
          eventIdx.current = eventIdx.current + 1;
        }
      }, 150 *  Math.exp(-values.length/50));
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isSortActive, isSortPaused]);
  
  const handleStart = () => {
    setSortActive(true);
    setSortPaused(false);
  };
  
  const handlePauseResume = () => {
    setSortPaused(!isSortPaused);
  };

  const randomizeArray = () => {
    const newValues = shuffleArray(values);
    setValues(newValues);
  }

  const resetArray = () => {
    events.current = {} as SortingEvents;
    eventSize.current = 0;
    eventIdx.current = 0;
    setSortPaused(true);
    setSortActive(false)
    setHighlightedBars([])
  }

  const sortArray = () => {
    events.current = types[sortType](values);
    eventSize.current = events.current.arrays.length;
    handleStart();
    // setValues(events.current.arrays[events.current.arrays.length - 1])
  }
  
  return (
    <>
      <div>SortingAlgorithms</div>
      <Box 
          sx={{ 
              width: 500,
              marginLeft: "auto",
              marginRight: "auto", 
              }}
          mt={3} 
          >
          <RangeSlider 
            sliderValue={sliderValue} 
            handleChange={handleChangeSliderValue} 
            active={isSortActive}/>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Box sx={{}}>
            <Button sx={{marginRight: 1,}} variant="contained" endIcon={<SortIcon />} onClick={randomizeArray} disabled={isSortActive}>
                Mix
            </Button>
            <Button sx={{marginRight: 1,}} variant="contained" endIcon={<RestartAltIcon />} onClick={resetArray}>
                Reset
            </Button>
            {!isSortActive && <Button sx={{marginRight: 1,}} variant="contained" endIcon={<PlayArrowIcon />} onClick={sortArray}>
                Play
            </Button>}
            {!isSortPaused && <Button variant="contained" endIcon={<StopIcon />} onClick={handlePauseResume}>
                Stop
            </Button>}
            {isSortPaused && isSortActive && <Button variant="contained" endIcon={<PlayCircleOutlineIcon />} onClick={handlePauseResume}>
                Resume
            </Button>}
            </Box>
            <SelectSort 
              handleChange={handleChangeSortType} 
              sortType={sortType} 
              types={Object.keys(types)}
              active={isSortActive}
              />
          </Box>     
      </Box>
      <Boxes 
        values={values} 
        highlightedBars={highlightedBars}
        />
    </>
    
  )
}

export default SortingAlgorithms