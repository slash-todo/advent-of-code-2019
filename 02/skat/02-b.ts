import inputs = require('./input');

function processIntcode(
    instructions: number[],
    overrideA?: number,
    overrideB?: number
): number {
    // optional overrides
    instructions[1] = overrideA !== undefined ? overrideA : instructions[1];
    instructions[2] = overrideB !== undefined ? overrideB : instructions[2];

    // main processing loop
    for (let i: number = 0; i < instructions.length; i = i + 4) {
        // check opcode
        const opcode: number = instructions[i];

        // if opcode is 99, end execution
        if (opcode === 99) break;

        // if opcode is wrong, throw error
        // if (opcode !== 1 && opcode !== 2) {
        //     throw new Error(`Invalid Opcode: ${opcode}`);
        // }

        // if its not 99, process the sequence
        const a: number = instructions[instructions[i + 1]];
        const b: number = instructions[instructions[i + 2]];
        const writeLocation: number = instructions[i + 3];

        // if opcode is 1, add
        if (opcode === 1) {
            instructions[writeLocation] = a + b;
        }

        // if opcode is 2, multiply
        if (opcode === 2) {
            instructions[writeLocation] = a * b;
        }
    }

    return instructions[0];
}

const solution: number = 19690720;
let noun: number = 0;
let verb: number = 0;
let result: number | undefined;

for (noun = 0; noun < 100; noun++) {
    for (verb = 0; verb < 100; verb++) {
        result = processIntcode([...inputs], noun, verb);
        if (result === solution) break;
    }
    if (result === solution) break;
}

console.log(noun * 100 + verb);
