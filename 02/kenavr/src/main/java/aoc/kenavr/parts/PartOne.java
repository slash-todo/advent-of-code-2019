package aoc.kenavr.parts;

import java.util.function.BiFunction;

public class PartOne {
    private int[] opcodes;

    public PartOne(int[] opcodes) {
        this.opcodes = opcodes;
    }

    public int[] run(int idx) {
        int code = this.opcodes[idx];

        BiFunction<Integer, Integer, Integer> sumByIdx = (idx1, idx2) -> Integer.sum(opcodes[opcodes[idx1]], opcodes[opcodes[idx2]]);
        BiFunction<Integer, Integer, Integer> multiplyByIdx = (idx1, idx2) -> opcodes[opcodes[idx1]] * opcodes[opcodes[idx2]];

        switch (code) {
            case 1:
                opcodes[opcodes[idx + 3]] = sumByIdx.apply(idx + 1, idx + 2);
                break;
            case 2:
                opcodes[opcodes[idx + 3]] = multiplyByIdx.apply(idx + 1, idx + 2);
                break;
            case 99:
                return this.opcodes;
            default:
                break;
        }

        return this.run(idx + 4);
    }
}
