import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;

public class Day10 {

    private static int[] list = new int[256];
    private static int currentPosition = 0;

    private static void init() {
        for(int i = 0; i < list.length; i++)
            list[i] = i;
    }

    private static void partOne(String filename) {
        int input;
        int skipSize = 0;
        StringBuilder currentLength = new StringBuilder();

        init();

        try (InputStream in = new FileInputStream(filename)) {

            while ((input = in.read()) != -1) {
                if(input == ',') {
                    reverse(Integer.valueOf(currentLength.toString()));

                    if(currentPosition + Integer.valueOf(currentLength.toString()) + skipSize < list.length)
                        currentPosition += Integer.valueOf(currentLength.toString()) + skipSize;

                    else if(currentPosition + Integer.valueOf(currentLength.toString()) + skipSize > list.length)
                        currentPosition = currentPosition + Integer.valueOf(currentLength.toString()) + skipSize
                                            - list.length;

                    skipSize++;
                    currentLength.setLength(0);
                } else
                    currentLength.append((char) input);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void partTwo(String filename) {
        int input;
        StringBuilder currentLength = new StringBuilder();

        try (InputStream in = new FileInputStream(filename)) {

            while ((input = in.read()) != -1) {
                if (input == ',') {

                } else {

                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void reverse(int length) {
        ArrayList<Integer> sublist = new ArrayList<>();
        boolean listEndReached = false;
        int currentIndex = 0;

        if(length == 1)
            return;

        for(int i = 0; i < length; i++) {
            if (currentPosition + i > list.length - 1 && !listEndReached) {
                listEndReached = true;
            }

            if(listEndReached) {
                sublist.add(list[currentIndex]);
                currentIndex++;
            } else
                sublist.add(list[currentPosition + i]);
        }

        Collections.reverse(sublist);

        listEndReached = false;

        for(int i = 0; i < length; i++) {
            if (currentPosition + i > list.length - 1 && !listEndReached) {
                listEndReached = true;
                currentIndex = 0;
            }

            if(listEndReached) {
                list[currentIndex] = sublist.get(i);
                currentIndex++;
            } else
                list[currentPosition + i] = sublist.get(i);
        }
    }

    public static void main(String args[]) {
        partOne("day_10_input.txt");

        System.out.println("Result for part one: " + list[0]*list[1]);
    }
}
