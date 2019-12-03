total_fuel = 0
def gif_fuel_required(mass):
    return int(mass / 3) - 2

with open("puzzle_input.txt") as file:
    for line in file:
        total_fuel += gif_fuel_required(int(line))
        
print("Daddy... I mean Santa, needs ", total_fuel, "units of fuel")