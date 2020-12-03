import java.io.*;

public class Day5 {

    private static int[] createMaze(String filename) {
        int[] maze = new int[countLines(filename)];
        int inputData;
        int currentIndex = 0;
        boolean isNegative = false;
        StringBuilder currentNumber = new StringBuilder();

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {
                if( inputData == '-' ) {
                    isNegative = true;

                } else if( inputData == '\r' ) {

                } else if( inputData == '\n' ) {
                    maze[currentIndex] = Integer.valueOf(currentNumber.toString());

                    if(isNegative)
                        maze[currentIndex] *= (-1);

                    currentIndex++;
                    currentNumber.setLength(0);
                    isNegative = false;
                } else
                    currentNumber.append((char) inputData);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return maze;
    }

    private static int countLines(String filename) {
        int lineCounter = 0;

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filename))) {

            while ((bufferedReader.readLine()) != null)
                lineCounter++;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return lineCounter;
    }

    private static int exitMaze(int[] maze) {
        int steps = 0;
        int currentIndex = 0;

        while(currentIndex < maze.length) {
            if(maze[currentIndex] < 3) {
                maze[currentIndex] += 1;
                currentIndex += maze[currentIndex] - 1;
            } else {
                maze[currentIndex] -= 1;
                currentIndex += maze[currentIndex] + 1;
            }
            steps++;
        }

        return steps;
    }

    public static void main(String args[]) {
        int[] maze = createMaze("day_5_input.txt");
        int steps = exitMaze(maze);

        System.out.println(steps);
    }
}
