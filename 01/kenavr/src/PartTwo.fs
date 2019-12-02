namespace Aoc

open System
open System.IO

module PartTwo =
  let rec calcFuelMass (mass: int): int =
    let fuelMass = mass / 3 - 2

    if fuelMass <= 0 then 0
    else fuelMass + calcFuelMass(fuelMass)
   
  let fuelMassSum (acc: int) (fuelMass: int): int = acc + fuelMass

  let calcRequiredFuel (inputs: int[]): int = 
    inputs
      |> Array.map calcFuelMass
      |> Array.reduce fuelMassSum


    