import { render, screen } from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { BubbleChartOutlined } from '@mui/icons-material';
import { bubbleSort, insertionSort, mergeSort, quickSort, selectionSort, shuffleArray } from './sorts';

describe('Testing Sort Algorithms', () => {

    var randomArray: number[];

    beforeEach(() => {
        const N = 20;
        randomArray = shuffleArray( Array.from({length: N}, (_, index) => index + 1))
        // randomArray= Array.from({length: 10}, () => Math.floor(Math.random() * 100));      
    })

    it('test bubble sort', () => {
        const generatedArrays = bubbleSort(randomArray).arrays;
        const lastArray = generatedArrays[generatedArrays.length - 1];
        const sortedArray = randomArray.sort((a,b) =>(a-b))
        expect(lastArray).toEqual(sortedArray)
    })

    it('test selection sort', () => {
        const generatedArrays = selectionSort(randomArray).arrays;
        const lastArray = generatedArrays[generatedArrays.length - 1];
        const sortedArray = randomArray.sort((a,b) =>(a-b))
        expect(lastArray).toEqual(sortedArray)
    })

    it('test insertion sort', () => {
        const generatedArrays = insertionSort(randomArray).arrays;
        const lastArray = generatedArrays[generatedArrays.length - 1];
        const sortedArray = randomArray.sort((a,b) =>(a-b))
        expect(lastArray).toEqual(sortedArray)
    })

    it('test merge sort', () => {
        const generatedArrays = mergeSort(randomArray).arrays;
        const lastArray = generatedArrays[generatedArrays.length - 1];
        const sortedArray = randomArray.sort((a,b) =>(a-b))
        expect(lastArray).toEqual(sortedArray)
    })

    it('test quick sort', () => {
        const generatedArrays = quickSort(randomArray).arrays;
        const lastArray = generatedArrays[generatedArrays.length - 1];
        const sortedArray = randomArray.sort((a,b) =>(a-b))
        expect(lastArray).toEqual(sortedArray)
    })

})