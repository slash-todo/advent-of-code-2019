package aoc.kenavr.parts

import aoc.kenavr.models.Password

class PartOne(private val start: Int, private val end: Int) {
    fun calcValidNumberCount(): Int {
        return IntRange(start, end)
            .filter { n -> Password(n).isValid() }
            .count()
    }
}