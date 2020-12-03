import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day24 {

    private static class Component {
        int firstPort;
        int secondPort;

        public Component(int firstPort, int secondPort) {
            this.firstPort = firstPort;
            this.secondPort = secondPort;
        }
    }

    private static List<Component> components = new ArrayList<>();

    private static void loadComponents(String filename) {
        String currentLine;

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {

            while ((currentLine = br.readLine()) != null) {
                String[] splitLine = currentLine.split("/");

                Component component = new Component(Integer.valueOf(splitLine[0]), Integer.valueOf(splitLine[1]));
                components.add(component);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        loadComponents("test.txt");
        System.out.println();
    }
}
