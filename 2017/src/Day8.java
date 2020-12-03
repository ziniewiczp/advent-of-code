import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Day8 {

    private static int overallMax;
    private static int finalMax;
    private static Map<String, Integer> registers;

    private static void processInstructions(String filename) {
        String currentLine;

        registers = new HashMap<>();
        overallMax = 0;
        finalMax = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {

            while ((currentLine = br.readLine()) != null) {

                String[] splitLine = currentLine.split("\\s+"); // one or more whitespaces.

                String registerToModify = splitLine[0];
                String action = splitLine[1];
                int modificationValue = Integer.valueOf(splitLine[2]);
                String conditionRegister = splitLine[4];
                String conditionSign = splitLine[5];
                int conditionValue = Integer.valueOf(splitLine[6]);

                if(!registers.containsKey(registerToModify))
                    registers.put(registerToModify, 0);

                if(!registers.containsKey(conditionRegister))
                    registers.put(conditionRegister, 0);

                if( isConditionSatisfied(registers.get(registerToModify), conditionValue, conditionSign) ) {
                    if(action.equals("dec"))
                        modificationValue *= (-1);

                    registers.put(registerToModify, registers.get(registerToModify) + modificationValue);

                    if(registers.get(registerToModify) > overallMax)
                        overallMax = registers.get(registerToModify);
                }

            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static boolean isConditionSatisfied(int registerValue, int conditionValue, String conditionSign) {
        switch(conditionSign) {
            case ">":
                return registerValue > conditionValue;

            case "<":
                return registerValue < conditionValue;

            case ">=":
                return registerValue >= conditionValue;

            case "<=":
                return registerValue <= conditionValue;

            case "==":
                return registerValue == conditionValue;

            case "!=":
                return registerValue != conditionValue;

            default:
                return false;
        }
    }

    private static void findFinalMax() {
        Iterator it = registers.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            int value = (int) pair.getValue();
            it.remove(); // avoids a ConcurrentModificationException

            if (value > finalMax)
                finalMax = value;
        }
    }

    public static void main(String args[]) {

        processInstructions("day_8_input.txt");
        findFinalMax();

        System.out.println("Largest value in any register: " + finalMax);
        System.out.println("Highest value held in any register during process: " + overallMax);
    }
}
