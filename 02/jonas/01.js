let program = require(`./input`);
let halt = false,
  status = true;

const binaryOp = fn => (adrA, adrB, adrRes) => {
  program[adrRes] = fn(program[adrA], program[adrB]);
};

const applyOp = (op, adr, argc) => {
  const argv = program.slice(adr + 1, adr + argc + 1);
  op(...argv);
};

const resolveOpCode = code => {
  switch (code) {
    case 1:
      return {
        op: binaryOp((a, b) => a + b),
        argc: 3
      };
    case 2:
      return {
        op: binaryOp((a, b) => a * b),
        argc: 3
      };
    case 99:
      return {
        op: () => {
          halt = true;
          status = true;
        },
        argc: 0
      };
    default:
      return {
        op: () => {
          halt = true;
          status = false;
        },
        argc: 0
      };
  }
};

const exec = adr => {
  const { op, argc } = resolveOpCode(program[adr]);

  applyOp(op, adr, argc);

  if (halt) {
    return status;
  }
  return exec(adr + argc + 1);
};

program[1] = 12;
program[2] = 2;

console.log(exec(0));
console.log(program);
