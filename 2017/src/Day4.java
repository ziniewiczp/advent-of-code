import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Day4 {

    private static int validatePassphrases(String filename) {
        int inputData;
        int validPassphrases = 0;
        boolean isValidPassphrase = true;
        Set<String> currentLine = new HashSet<>();
        StringBuilder currentWord = new StringBuilder();

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {

                if( inputData == ' ' ) {

                    if( !currentLine.add(sortWord(currentWord.toString())) && isValidPassphrase)
                        isValidPassphrase = false;
                    currentWord.setLength(0);
                } else if (inputData == '\r') {

                } else if (inputData == '\n') {

                    if( !currentLine.add(sortWord(currentWord.toString())) && isValidPassphrase)
                        isValidPassphrase = false;

                    if( isValidPassphrase )
                        validPassphrases++;

                    isValidPassphrase = true;
                    currentWord.setLength(0);
                    currentLine.clear();
                } else {
                    currentWord.append((char) inputData);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return validPassphrases;
    }

    private static String sortWord(String word) {
        char[] sortedWord = word.toCharArray();
        Arrays.sort(sortedWord);
        return new String(sortedWord);
    }

    public static void main(String args[]) {
        System.out.println(validatePassphrases("day_4_input.txt"));
    }
}
