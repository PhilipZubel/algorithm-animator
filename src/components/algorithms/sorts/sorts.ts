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

export { shuffleArray, bubbleSort, selectionSort, insertionSort };
export type { SortingEvents, ColorChange };
