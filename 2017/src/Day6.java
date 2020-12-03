import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class Day6 {

    private static ArrayList<Integer> createMemory(String filename) {
        int inputData;
        ArrayList<Integer> memory = new ArrayList<>();
        StringBuilder currentNumber = new StringBuilder();

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {
                if(inputData == ' ') {
                    memory.add(Integer.valueOf(currentNumber.toString()));
                    currentNumber.setLength(0);
                } else {
                    currentNumber.append((char) inputData);
                }
            }

            memory.add(Integer.valueOf(currentNumber.toString()));

        } catch (IOException e) {
            e.printStackTrace();
        }

        return memory;
    }

    private static int reallocateMemory(ArrayList<Integer> memory) {
        int steps = 0;
        int currentMax;
        int pastStatesIndex = 0;
        StringBuilder currentMemoryState = new StringBuilder();
        Map<Integer, String> pastMemoryStates = new HashMap<Integer, String>();
        boolean notLooped = true;

        for (Integer item : memory) {
            currentMemoryState.append(item.toString()).append(" ");
        }

        pastMemoryStates.put(pastStatesIndex, currentMemoryState.toString());
        pastStatesIndex++;
        currentMemoryState.setLength(0);

        while(notLooped) {

            currentMax = Collections.max(memory);

            int memoryIndex = 0;

            while (memory.get(memoryIndex) != currentMax)
                memoryIndex++;

            memory.set(memoryIndex, 0);
            memoryIndex++;

            while (currentMax > 0) {
                if (memoryIndex > memory.size() - 1)
                    memoryIndex = 0;

                memory.set(memoryIndex, memory.get(memoryIndex) + 1);
                memoryIndex++;
                currentMax--;
            }

            for (Integer item : memory) {
                currentMemoryState.append(item.toString()).append(" ");
            }

            if (pastMemoryStates.containsValue(currentMemoryState.toString()))
                notLooped = false;
            else {
                pastMemoryStates.put(pastStatesIndex, currentMemoryState.toString());
                pastStatesIndex++;
                currentMemoryState.setLength(0);
            }

            steps++;
        }

        pastStatesIndex = 0;

        while( !pastMemoryStates.get(pastStatesIndex).equals(currentMemoryState.toString()) )
            pastStatesIndex++;

        return steps - pastStatesIndex;
    }

    public static void main(String args[]) {

        ArrayList<Integer> memory = createMemory("day_6_input.txt");
        int steps = reallocateMemory(memory);

        System.out.println(steps);

    }
}
