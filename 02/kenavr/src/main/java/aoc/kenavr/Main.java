package aoc.kenavr;

import aoc.kenavr.parts.PartOne;

public class Main {
    public static void main(String[] args) {
        int[] numbers = Utils.loadInputs("input.txt");
        numbers[1] = 12;
        numbers[2] = 2;

        PartOne one = new PartOne(numbers);
        int[] result = one.run(0);
        System.out.println(String.format("1) Calculated Value: %d", result[0]));
    }
}
