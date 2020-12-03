import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day23 {

    private static List<String> instructions;
    private static int[] registers;
    private static int currentInstruction;
    private static int multiplicationCount;

    private static void init() {
        registers = new int[8];
        Arrays.fill(registers, 0);
        registers[0] = 1;

        // mapping for registers (#ASCII):
        //    'a' - 97 = 0
        //    'b' - 97 = 1
        //        ...
        //    'h' - 97 = 7

        instructions = new ArrayList<>();

        currentInstruction = 0;
        multiplicationCount = 0;
    }

    private static void populateInstructions(String filename) {
        String currentLine;

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {

            while ((currentLine = br.readLine()) != null) {
                instructions.add(currentLine);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static String[] translateCurrentInstruction() {
        String instruction = instructions.get(currentInstruction);

        return instruction.split("\\s+");
    }

    private static void processInstruction(String[] instruction) {
        String command = instruction[0];
        int register;

        if (Character.isLetter(instruction[1].charAt(0)))
            register = instruction[1].charAt(0) - 97;
        else
            register = -1;

        int value;

        if (Character.isLetter(instruction[2].charAt(0)))
            value = registers[instruction[2].charAt(0) - 97];
        else
            value = Integer.valueOf(instruction[2]);

        switch(command) {
            case "set":
                registers[register] = value;
                currentInstruction++;
                break;

            case "sub":
                registers[register] -= value;
                currentInstruction++;
                break;

            case "mul":
                registers[register] *= value;
                currentInstruction++;
                multiplicationCount++;
                break;

            case "jnz":
                if(register < 0)
                    currentInstruction += value;
                else if (registers[register] != 0)
                    currentInstruction += value;
                else
                    currentInstruction++;
                break;
        }
    }

    public static void main(String[] args) {
        init();
        populateInstructions("day_23_input.txt");

        while(currentInstruction < instructions.size()) {
            String[] instructionToProcess = translateCurrentInstruction();
            processInstruction(instructionToProcess);
        }

        System.out.println(registers[7]);
    }
}
