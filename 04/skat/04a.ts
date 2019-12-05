import inputs from './input';

// const min: number = 347312;
const min: number = 400000;
const max: number = 805915;

const possibilities: number[] = [];

for (let i: number = min; i < max; i++) {
    const string: string = i.toString(10);
    const number: number = i;
    const array: number[] = string.split('').map(str => Number(str));

    // conditions
    const isSixDigitNumber: boolean = string.split('').length === 6;
    const isInRange: boolean = number > min && number < max;
    const adjacentDigitsMatch: boolean = array.some(
        (val, index, arr): boolean => arr[index] === arr[index + 1]
    );
    const isIncreasingSequence: boolean = array.every(
        (val, index, arr): boolean => {
            return (
                arr[index] <= arr[index + 1] ||
                arr[index] === arr[arr.length - 1]
            );
        }
    );
    debugger;
    if (
        isSixDigitNumber &&
        isInRange &&
        adjacentDigitsMatch &&
        isIncreasingSequence
    ) {
        // if all conditions are true, add to the possibilities
        possibilities.push(i);
    }
}

console.log(possibilities.length);
