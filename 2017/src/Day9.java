import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Day9 {

    private static int processInput(String filename) {
        int inputData;

        int score = 0;
        int nestingLevel = 1;
        boolean isGarbage = false;
        boolean ignoreNextChar = false;
        int nonCanceledChars = 0;

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {

                if (!ignoreNextChar) {

                    if (inputData == '{' && !isGarbage) {
                        score += nestingLevel;
                        nestingLevel++;

                    } else if (inputData == '}' && !isGarbage) {
                        nestingLevel--;

                    } else if (inputData == '<' && !isGarbage) {
                        isGarbage = true;

                    } else if (inputData == '>') {
                        isGarbage = false;

                    } else if (inputData == '!') {
                        ignoreNextChar = true;

                    } else if (isGarbage) {
                        nonCanceledChars++;
                    }
                } else
                    ignoreNextChar = false;

            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return nonCanceledChars;
    }

    public static void main(String args[]) {
        System.out.println(processInput("day_9_input.txt"));
    }
}
