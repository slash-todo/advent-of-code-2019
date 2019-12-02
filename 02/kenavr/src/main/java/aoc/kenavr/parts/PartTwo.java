package aoc.kenavr.parts;

import aoc.kenavr.models.Pair;

import java.util.Arrays;

public class PartTwo {
    private static final int GOAL = 19690720;

    private int[] memory;

    public PartTwo(int[] memory) {
        this.memory = memory;
    }

    private boolean evaluate(Pair<Integer, Integer> values) {
        this.memory[1] = values.noun;
        this.memory[2] = values.verb;

        PartOne runner = new PartOne(Arrays.copyOf(this.memory, this.memory.length));
        int[] res = runner.run(0);
        return res[0] == GOAL;
    }

    public Pair<Integer, Integer> run() {
        for (int noun = 0; noun < 100; noun++) {
            for (int verb = 0; verb < 100; verb++) {
                Pair<Integer, Integer> pair = new Pair<>(noun, verb);
                if (this.evaluate(pair)) {
                    return pair;
                }
            }
        }
        return new Pair<>(-1, -1);
    }
}
