import { arrayBuffer } from "stream/consumers";

const shuffleArray = (arr: number[]) : number[] => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

interface ColorChange {
  valueIndex: number,
  timeIndex: number,
}

interface SortingEvents {
  arrays: number[][],
  colorChanges: ColorChange[],
}

const intializeValues = (arr: number[]) => {
  let array = [...arr];
  let arrays: number[][] = [[...array]];
  let colorChanges: ColorChange[] = []
  let timeIdx = 0;
  return {
    array:array,
    arrays:arrays,
    colorChanges:colorChanges,
    timeIdx:timeIdx,
  }
}

const bubbleSort = (arr: number[]) : SortingEvents => {
  let {array, arrays, colorChanges, timeIdx} = intializeValues(arr);

  for(let i=0; i<array.length - 1; i++){
    for(let k=0; k<array.length - 1 - i; k++) {
      colorChanges.push({valueIndex: k, timeIndex: timeIdx})

      if (array[k] > array[k+1]){
        let temp = array[k]
        array[k] = array[k+1];
        array[k+1] = temp;
      }
      arrays.push([...array])
      timeIdx++;
    }
  }

  return {
    arrays: arrays,
    colorChanges: colorChanges,
  }
}

const selectionSort = (arr: number[]) : SortingEvents => {
  let {array, arrays, colorChanges, timeIdx} = intializeValues(arr);

  for(let i=0; i<array.length - 1; i++){
    let minIdx = i;
    for(let k=i+1; k<array.length; k++) {
      colorChanges.push({valueIndex: k, timeIndex: timeIdx})
      colorChanges.push({valueIndex: minIdx, timeIndex: timeIdx})

      if(array[k] < array[minIdx]){
        minIdx = k;
      }

      arrays.push([...array])
      timeIdx++;
    }

    let temp = array[i];
    array[i] = array[minIdx];
    array[minIdx] = temp;

    colorChanges.push({valueIndex: minIdx, timeIndex: timeIdx})
    colorChanges.push({valueIndex: i, timeIndex: timeIdx})

    arrays.push([...array])
    timeIdx++;   
  }

  return {
    arrays: arrays,
    colorChanges: colorChanges,
  }
}

const insertionSort = (arr: number[]) : SortingEvents => {
  let {array, arrays, colorChanges, timeIdx} = intializeValues(arr);

  for(let i=1; i<array.length; i++){
    let k=i;
    while(k>0 && array[k] < array[k-1]){
      colorChanges.push({valueIndex: k, timeIndex: timeIdx})
      let temp = array[k];
      array[k] = array[k-1];
      array[k-1] = temp;
      arrays.push([...array])
      timeIdx++
      k--;
    }
  }

  return {
    arrays: arrays,
    colorChanges: colorChanges,
  }
}

const mergeSortHelper = (arr: number[], start:number, end:number, arrays:number[][], colorChanges:ColorChange[]): [number,number] => {
  if(start === end){
    return [start, end];
  }
  let mid = Math.floor((start + end)/2);
  let leftArray = mergeSortHelper(arr, start, mid, arrays, colorChanges);
  let rightArray = mergeSortHelper(arr, mid+1, end, arrays, colorChanges);
  let arr_copy = [...arr];

  let copyIdx = start; 
  while(leftArray[0] <= leftArray[1] && rightArray[0] <= rightArray[1]){
    if(arr_copy[leftArray[0]] < arr_copy[rightArray[0]]){
      arr[copyIdx++] = arr_copy[leftArray[0]++];
    }else{
      arr[copyIdx++] = arr_copy[rightArray[0]++];
    }
    arrays.push([...arr]);
    colorChanges.push({valueIndex: copyIdx, timeIndex: arrays.length - 1});
  }
  while(leftArray[0] <= leftArray[1]){
    arr[copyIdx++] = arr_copy[leftArray[0]++];
    arrays.push([...arr]);
    colorChanges.push({valueIndex: copyIdx, timeIndex: arrays.length - 1});
  }
  while(rightArray[0] <= rightArray[1]){
    arr[copyIdx++] = arr_copy[rightArray[0]++];
    arrays.push([...arr]);
    colorChanges.push({valueIndex: copyIdx, timeIndex: arrays.length - 1});
  }
  
  return [start, end];
}

const mergeSort = (arr: number[]) : SortingEvents => {
  let {array, arrays, colorChanges, timeIdx} = intializeValues(arr);

  mergeSortHelper(array, 0, array.length - 1, arrays, colorChanges)

  console.log(arrays)

  return {
    arrays: arrays,
    colorChanges: colorChanges,
  }
}

export { shuffleArray, bubbleSort, selectionSort, insertionSort, mergeSort };
export type { SortingEvents, ColorChange };
