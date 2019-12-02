namespace Aoc

open System
open System.IO

module PartOne =
  let calcRequiredFuelEmpty inputs=
    let calcFuel (mass: int): int = mass / 3 - 2
    let calcFuelSum (acc: int) (fuel: int): int = acc + fuel

    inputs 
      |> Array.map calcFuel
      |> Array.reduce calcFuelSum