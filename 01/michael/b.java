import java.io.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Calculating Fuel Requirement");
        System.out.println(processInput());
    }

    private static int processInput() {
        String fileName = "input.txt";
        double fuelSum = 0.0;
        BufferedReader input;
        try {
            input = new BufferedReader(new FileReader(fileName));
            String currentLine = input.readLine();
            while (currentLine != null && currentLine != "") {
                fuelSum += calculateFuel(Integer.parseInt(currentLine));
                currentLine = input.readLine();
            }
            input.close();
            return (int) fuelSum;
        } catch (IOException e) {
            System.out.println(e);
            return 0;
        }
    }

    private static double calculateFuel(int mass) {
        return calculateFuelRequirementForFuel(Math.floor((mass / 3) - 2));
    }

    private static double calculateFuelRequirementForFuel(double currentFuel) {
        double totalRequiredFuel = currentFuel;
        double additionalFuel = Math.floor((currentFuel / 3) - 2);
        while (additionalFuel > 0) {
            totalRequiredFuel += additionalFuel;
            System.out.println(additionalFuel);
            additionalFuel = Math.floor((additionalFuel / 3) - 2);
        }
        return totalRequiredFuel;
    }

}