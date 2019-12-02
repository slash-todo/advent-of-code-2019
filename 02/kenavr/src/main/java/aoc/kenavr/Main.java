package aoc.kenavr;

import aoc.kenavr.models.Pair;
import aoc.kenavr.parts.PartOne;
import aoc.kenavr.parts.PartTwo;

import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        final int[] numbers = Utils.loadInputs("input.txt");
        numbers[1] = 12;
        numbers[2] = 2;

        PartOne one = new PartOne(Arrays.copyOf(numbers, numbers.length));
        int[] result = one.run(0);
        System.out.println(String.format("1) Calculated Value: %d", result[0]));

        PartTwo two = new PartTwo(Arrays.copyOf(numbers, numbers.length));
        Pair<Integer, Integer> values = two.run();
        System.out.println(String.format("2) The pair generating the result is noun=%d and verb=%d. The code is: %d", values.noun, values.verb, 100 * values.noun + values.verb));
    }
}
