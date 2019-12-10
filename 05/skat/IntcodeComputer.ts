export default class IntcodeComputer {
    intcode: number[];
    pointer: number;
    instructions: Map<number, Instruction>;
    halt: boolean;
    constructor(intcode: number[]) {
        this.intcode = intcode;
        this.pointer = 0;
        this.halt = false;
        this.instructions = this.generateInstructions();
    }
    init(): void {
        this.generateInstructions();
    }
    generateInstructions() {
        const instructions: Map<number, Instruction> = new Map();
        instructions.set(
            1,
            new Instruction(this, 1, 3, (a: number, b: number): number => a + b)
        );
        instructions.set(
            2,
            new Instruction(this, 2, 3, (a: number, b: number): number => a * b)
        );
        instructions.set(
            99,
            new Instruction(this, 99, 0, () => (this.halt = true))
        );
        return instructions;
    }
    processInstruction(): void {
        const currentValue: number = this.intcode[this.pointer];
        const instruction: Instruction | undefined = this.instructions.get(
            currentValue
        );

        // If the instruction wasn't found, throw an Error
        if (!instruction) {
            throw new Error(`Unknown Opcode: ${currentValue}`);
        }

        const params: number[] = instruction
            ? new Array(instruction.parameterLength)
                  .fill(0)
                  .map((val: number, index: number): number => {
                      return (val = this.intcode[this.pointer + index + 1]);
                  })
            : [];

        const result = instruction.execute(...params);

        if (!this.halt) {
        }

        this.pointer += instruction.parameterLength + 1;
    }
}

class Instruction {
    computer: IntcodeComputer;
    code: number;
    parameterLength: number;
    routine: Function;
    constructor(
        computer: IntcodeComputer,
        code: number,
        parameterLength: number,
        routine: Function
    ) {
        this.computer = computer;
        this.code = code;
        this.parameterLength = parameterLength;
        this.routine = routine;
    }
    execute(...params: number[]): number {
        return this.routine(...params);
    }
}

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
