import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Day7 {

    private static Map<String, Integer> allTowers;
    private static Map<String, String> topLevelTowers;
    private static Map<String, ArrayList<String>> childrenMap;

    private static void processInput(String filename) {
        int inputData;
        allTowers = new HashMap<>();
        topLevelTowers = new HashMap<>();
        childrenMap = new HashMap<>();
        StringBuilder currentTower = new StringBuilder();
        String baseTower = "";
        StringBuilder currentWeight = new StringBuilder();
        boolean nextLevelReached = false;

        try (InputStream in = new FileInputStream(filename)) {

            while ((inputData = in.read()) != -1) {
                if(inputData > 64 && inputData < 123) {
                    currentTower.append((char) inputData);

                } else if(inputData > 47 && inputData < 58) {
                    currentWeight.append((char) inputData);

                } else if(inputData == '\n' && !nextLevelReached) {
                    allTowers.put(currentTower.toString(), Integer.valueOf(currentWeight.toString()));
                    currentTower.setLength(0);
                    currentWeight.setLength(0);

                } else if(inputData == '\n' && nextLevelReached) {
                    topLevelTowers.put(currentTower.toString(), baseTower);
                    currentTower.setLength(0);
                    nextLevelReached = false;

                } else if(inputData == ',') {
                    topLevelTowers.put(currentTower.toString(), baseTower);
                    currentTower.setLength(0);

                } else if(inputData == '>') {
                    nextLevelReached = true;
                    allTowers.put(currentTower.toString(), Integer.valueOf(currentWeight.toString()));
                    baseTower = currentTower.toString();
                    currentTower.setLength(0);
                    currentWeight.setLength(0);
                }
            }

            topLevelTowers.put("fbgguv", "");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void findWrongWeight() {

        Map<String, String> tempTopLevelTowers = new HashMap<>(topLevelTowers);

        Iterator it = tempTopLevelTowers.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            String tower = (String) pair.getKey();
            String baseTower = (String) pair.getValue();
            it.remove(); // avoids a ConcurrentModificationException

            createChildrenMap(tower);
        }

        Iterator it2 = childrenMap.entrySet().iterator();
        while(it2.hasNext()) {
            Map.Entry pair = (Map.Entry) it2.next();
            String tower = (String) pair.getKey();
            ArrayList<String> children = new ArrayList<>((ArrayList<String>) pair.getValue());

            int lastItem = allTowers.get(children.get(0));

            for(String currentItem : children){
                if(allTowers.get(currentItem) != lastItem) {
                    System.out.println(tower + " is uneven! " + currentItem + "(" + allTowers.get(currentItem) +
                            ") is different than other child: " + lastItem);
                    break;
                }
            }
        }
    }

    private static void createChildrenMap(String givenTower) {
        Map<String, String> tempTopLevelTowers = new HashMap<>(topLevelTowers);
        ArrayList<String> children = new ArrayList<>();

        Iterator it = tempTopLevelTowers.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry pair = (Map.Entry) it.next();
            String tower = (String) pair.getKey();
            String baseTower = (String) pair.getValue();
            it.remove(); // avoids a ConcurrentModificationException

            if(baseTower.equals(givenTower)) {
                //allTowers.put(givenTower, allTowers.get(givenTower) + allTowers.get(tower));
                children.add(tower);
            }
        }

        if(children.size() > 0)
            childrenMap.put(givenTower, children);
    }

    public static void main(String args[]) {
        processInput("day_7_input.txt");
        findWrongWeight();

        System.out.println();
    }
}
