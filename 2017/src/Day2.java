import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;

public class Day2 {

    private static ArrayList<ArrayList<Integer>> processInput(String filename) {
        int inputData;
        StringBuilder currentNumber = new StringBuilder();
        ArrayList<ArrayList<Integer>> resultArray = new ArrayList<>();
        ArrayList<Integer> currentRow = new ArrayList<>();

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {
                if (inputData == '\n') {
                    currentRow.add(Integer.valueOf(currentNumber.toString()));
                    resultArray.add(new ArrayList<>(currentRow));

                    currentNumber.setLength(0);
                    currentRow.clear();

                } else if (inputData == '\r') {
                    // in Windows (and many old OSs), the code for end of line is 2 characters: \r\n

                } else if(inputData == '\t' || inputData == ' ') {
                        currentRow.add(Integer.valueOf(currentNumber.toString()));
                        currentNumber.setLength(0);

                } else
                    currentNumber.append((char) inputData);
            }

            // add last number to last row and then row to result array
            currentRow.add(Integer.valueOf(currentNumber.toString()));
            resultArray.add(new ArrayList<>(currentRow));

        } catch (IOException e) {
            e.printStackTrace();
        }

        return resultArray;
    }

    private static int partOne(ArrayList<ArrayList<Integer>> input) {
        int rowMin, rowMax, rowDifference, sum = 0;
        for(ArrayList<Integer> row : input) {
            rowMin = Collections.min(row);
            rowMax = Collections.max(row);
            rowDifference = rowMax - rowMin;
            sum += rowDifference;
        }

        return sum;
    }

    private static int findEvenlyDivisibleValues(ArrayList<Integer> row) {
        for(int i = 0; i < row.size(); i++) {
            for(int j = i+1; j < row.size(); j++) {
                if( row.get(i) > row.get(j) ) {
                    if( row.get(i) % row.get(j) == 0)
                        return row.get(i)/row.get(j);
                } else {
                    if( row.get(j) % row.get(i) == 0)
                        return row.get(j)/row.get(i);
                }
            }
        }

        return 0;
    }

    private static int partTwo(ArrayList<ArrayList<Integer>> input) {
        int sum = 0;

        for(ArrayList<Integer> row : input) {
            sum += findEvenlyDivisibleValues(row);
        }

        return sum;
    }

    public static void main(String args[]) {
        ArrayList<ArrayList<Integer>> input = processInput("day_2_input.txt");
        System.out.println("Result for part one: " + partOne(input));
        System.out.println("Result for part two: " + partTwo(input));
    }
}
