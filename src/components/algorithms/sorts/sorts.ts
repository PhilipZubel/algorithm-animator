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

const bubbleSort = (arr: number[]) : SortingEvents => {
  let array = [...arr];
  
  let arrays: number[][] = [[...array]];
  let colorChanges: ColorChange[] = []
  let timeIdx = 0;

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

export { shuffleArray, bubbleSort };
export type { SortingEvents, ColorChange };
