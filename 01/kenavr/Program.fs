namespace Aoc

open System
open System.IO

open Aoc.PartOne

module main =
  [<EntryPoint>]
  let main argv =
      let toInt (mass: String): int = mass |> int
      let loadInputs: String[] = File.ReadAllLines(@"./input.txt") 
      let inputs: int[] = loadInputs |> Array.map toInt

      let requiredFuelEmpty = calcRequiredFuelEmpty inputs
      printfn "1) Required fuel empty: %s" (requiredFuelEmpty |> string)

      0 // return an integer exit code