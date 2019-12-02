import java.io.*;
import java.util.List;

class Main {
    public static void main(String[] args) {
        System.out.println("Processing Intcode Input");
        System.out.println(processIntcodeInput());
    }

    private static int processIntcodeInput() {
        BufferedReader reader;
        try {
            reader = new BufferedReader(new FileReader("input.txt"));
            // We can assume the input will be on a single line.
            String text = (String) reader.readLine();
            reader.close();
            if (text.length() != 0) {
                String[] inputList = text.split(",");
                int[] intInputList = new int[inputList.length];
                for (int i = 0; i < inputList.length; i++) {
                    intInputList[i] = Integer.parseInt(inputList[i]);
                }

                for (int i = 0; i <= 99; i++) {
                    for (int k = 0; k <= 99; k++) {
                        intInputList[1] = i;
                        intInputList[2] = k;
                        try {
                            if (runIntcodeInput(intInputList) == 19690720) {
                                return (100 * i) + k;
                            }
                        } catch (Exception e) {
                            continue;
                        }
                    }
                }

                return runIntcodeInput(intInputList);
            }
        } catch (IOException e) {
            System.out.println(e);
        }
        return 0;
    }

    private static int runIntcodeInput(int[] inputList) {
        int[] input = inputList.clone();
        for (int i = 0; i < input.length; i += 4) {
            if (input[i] == 1) {
                input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
            } else if (input[i] == 2) {
                input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
            } else if (input[i] == 99) {
                return input[0];
            }
        }
        return input[0];
    }
}