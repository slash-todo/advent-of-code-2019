class FuelCalculator():
  def __init__(self):
    self.total_fuel = 0
    self.naive_total_fuel = 0 
    self.fuel_for_this_module = 0
    self.run()
    print("Naive total fuel", self.naive_total_fuel)
    print("Total fuel : ", self.total_fuel)

  def run(self):
    with open("puzzle_input.txt") as file:
      for line in file:
        self.calculate_fuel_for_module(int(line))
        self.total_fuel += self.fuel_for_this_module

  def calculate_fuel_for_module(self, mass):
      self.naive_total_fuel += self.gif_fuel_required(mass)
      self.fuel_for_this_module = self.gif_fuel_required(mass)
      self.extra_fuel_loop(self.fuel_for_this_module)
  
  def gif_fuel_required(self, mass):
    return int(mass / 3) - 2

  def extra_fuel_loop(self, fuel_mass_unaccounted):
    extra_fuel = self.gif_fuel_required(fuel_mass_unaccounted)
    if extra_fuel > 0:
      self.fuel_for_this_module += extra_fuel
      self.extra_fuel_loop(extra_fuel)    

fuel_calc = FuelCalculator()