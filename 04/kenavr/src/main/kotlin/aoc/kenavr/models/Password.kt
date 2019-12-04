package aoc.kenavr.models

import java.util.ArrayList

class Password {
    private val number: Int
    private val digits: List<Int>

    constructor(number: Int) {
        this.number = number
        this.digits = this.toDigits(number)
    }

    fun isValid(): Boolean {
        return this.hasDouble() && this.isOnlyIncreasing()
    }

    fun isStrictlyValid(): Boolean {
        return this.isValid() && this.hasValidDigitGroups()
    }

    private fun toDigits(number: Int): List<Int> {
        var temp: Int = number
        val array = ArrayList<Int>()
        do {
            array.add(temp % 10)
            temp /= 10
        } while (temp > 0)

        return array.reversed()
    }

    private fun hasDouble(): Boolean {
        for (i in 1 until this.digits.size) {
            if (this.digits[i - 1] == this.digits[i]) {
                return true
            }
        }

        return false
    }

    private fun isOnlyIncreasing(): Boolean {
        for (i in 1 until this.digits.size) {
            if (this.digits[i - 1] > this.digits[i]) {
                return false
            }
        }

        return true
    }

    private fun hasValidDigitGroups(): Boolean {
        val regex = """([1-9])\1+""".toRegex()
        val numberAsString = this.digits.joinToString("")
        val results = regex.findAll(numberAsString).toList()

        if (results.any { r ->
                r.groups.any { g -> g?.value!!.length == 2 }
            }) {
            return true
        }

        return false
    }
}