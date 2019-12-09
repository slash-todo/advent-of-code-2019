// unsolved

import wires from './input';

// const wires: string[][] = [
//     ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
//     ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
// ];

// const wires: string[][] = [
//     ['R8', 'U5', 'L5', 'D3'],
//     ['U7', 'R6', 'D4', 'L4']
// ];

const getClosestWireIntersection = (wires: string[][]): number => {
    const coords: Map<string, number> = new Map();
    const placeWires = () => {
        wires.forEach((wire: string[]) => {
            let x: number = 0;
            let y: number = 0;
            wire.forEach((segment: string) => {
                const dir: string = segment.split('')[0];
                const xOff: number =
                    dir === 'U' || dir === 'D' ? 0 : dir === 'R' ? 1 : -1;
                const yOff: number =
                    dir === 'L' || dir === 'R' ? 0 : dir === 'U' ? 1 : -1;
                const dist: number = Number(
                    segment
                        .split('')
                        .splice(1)
                        .join('')
                );
                for (let i: number = 0; i < dist; i++) {
                    // increment coords first
                    x += xOff;
                    y += yOff;

                    // handle placing coord
                    if (coords.has(`${x},${y}`)) {
                        // if there is already an item, add one

                        const val: number = coords.get(`${x},${y}`) || 0;
                        coords.set(`${x},${y}`, val + 1);
                    } else {
                        // otherwise, instantiate to 1
                        coords.set(`${x},${y}`, 1);
                    }
                }
            });
        });
    };
    const getIntersections = () => {
        return Array.from(coords.entries()).filter(entry => entry[1] >= 2);
    };
    const findLowestManhattanDistance = (ints: [string, number][]): number => {
        const distances = ints
            .map((intersection: any) =>
                intersection[0]
                    .split(',')
                    .map((num: string): number => Math.abs(Number(num)))
            )
            .map((nums: number[]): number => nums[0] + nums[1]);
        return Math.min(...distances);
    };
    placeWires();
    return findLowestManhattanDistance(getIntersections());
};

console.log(getClosestWireIntersection(wires));
