const program = require(`./input`);

const tryValues = (noun, verb) => {
  let memory = [...program],
    halt = false,
    status = true;

  memory[1] = noun;
  memory[2] = verb;

  const binaryOp = fn => (adrA, adrB, adrRes) => {
    memory[adrRes] = fn(memory[adrA], memory[adrB]);
  };

  const applyOp = (op, adr, argc) => {
    const argv = memory.slice(adr + 1, adr + argc + 1);
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
    const { op, argc } = resolveOpCode(memory[adr]);

    applyOp(op, adr, argc);

    if (halt) {
      return status;
    }
    return exec(adr + argc + 1);
  };

  exec(0);
  return { status, output: memory[0] };
};

const findValues = () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const res = tryValues(noun, verb);
      if (res.status && res.output === 19690720) {
        return { noun, verb };
      }
    }
  }
};

console.log(findValues());
