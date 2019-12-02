import inputs = require('./input');

// hardcore computer repairs:
inputs[1] = 12;
inputs[2] = 2;

for (let i: number = 0; i < inputs.length; i = i + 4) {
    const opcode: number = inputs[i];
    const a: number = inputs[inputs[i + 1]];
    const b: number = inputs[inputs[i + 2]];
    const writeLocation: number = inputs[i + 3];

    // if opcode is 99, end execution
    if (opcode === 99) break;

    // if opcode is 1, add
    if (opcode === 1) {
        inputs[writeLocation] = a + b;
    }

    // if opcode is 2, multiply
    if (opcode === 2) {
        inputs[writeLocation] = a * b;
    }
}

console.log(inputs[0]);

export {};
