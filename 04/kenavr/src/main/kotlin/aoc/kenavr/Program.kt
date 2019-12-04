package aoc.kenavr

import aoc.kenavr.parts.PartOne
import aoc.kenavr.parts.PartTwo

fun main() {
    val start = 278384
    val end = 824795

    val one = PartOne(start, end)
    println("1) Number of valid number: %d".format(one.calcValidNumberCount()))

    val two = PartTwo(start, end)
    println("2) Number of valid number: %d".format(two.calcValidNumberCount()))
}
