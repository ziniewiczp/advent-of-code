import java.util.Arrays;

public class Day3 {

    private static int [][] spiralMemory;

    private static void createSpiralMemoryPartOne(int size) {
        spiralMemory = new int[(int) Math.sqrt(size)][(int) Math.sqrt(size)];
        int currentNum = 2;
        int startingX = (int) (Math.sqrt(size) - 1) / 2;
        int startingY = (int) (Math.sqrt(size) - 1) / 2;

        spiralMemory[startingX][startingY] = 1;

        int x = startingX + 1;
        int y = startingY;

        for(int currentBoundary = 1; currentBoundary <= startingX; currentBoundary++) {

            // moving up
            while (y > startingY - currentBoundary) {
                spiralMemory[x][y] = currentNum;
                currentNum++;
                y--;
            }

            // moving left
            while (x > startingX - currentBoundary) {
                spiralMemory[x][y] = currentNum;
                currentNum++;
                x--;
            }

            // moving down
            while (y < startingY + currentBoundary) {
                spiralMemory[x][y] = currentNum;
                currentNum++;
                y++;
            }

            // moving right
            while (x <= startingX + currentBoundary) {
                spiralMemory[x][y] = currentNum;
                currentNum++;
                x++;
            }
        }
    }

    private static void createSpiralMemoryPartTwo(int size) {
        spiralMemory = new int[(int) Math.sqrt(size)][(int) Math.sqrt(size)];

        int currentNum = 0;
        int startingX = (int) (Math.sqrt(size) - 1) / 2;
        int startingY = (int) (Math.sqrt(size) - 1) / 2;

        spiralMemory[startingX][startingY] = 1;

        int x = startingX + 1;
        int y = startingY;

        int currentBoundary = 1;
        boolean thresholdReached = false;
        int threshold = 325489;

        while(!thresholdReached) {

            // moving up
            while (y > startingY - currentBoundary) {
                currentNum = sumNeighbours(x, y);
                spiralMemory[x][y] = currentNum;
                if(currentNum > threshold)
                    thresholdReached = true;
                y--;
            }

            // moving left
            while (x > startingX - currentBoundary) {
                currentNum = sumNeighbours(x, y);
                spiralMemory[x][y] = currentNum;
                if(currentNum > threshold)
                    thresholdReached = true;
                x--;
            }

            // moving down
            while (y < startingY + currentBoundary) {
                currentNum = sumNeighbours(x, y);
                spiralMemory[x][y] = currentNum;
                if(currentNum > threshold)
                    thresholdReached = true;
                y++;
            }

            // moving right
            while (x <= startingX + currentBoundary) {
                currentNum = sumNeighbours(x, y);
                spiralMemory[x][y] = currentNum;
                if(currentNum > threshold)
                    thresholdReached = true;
                x++;
            }

            currentBoundary++;
        }
    }

    private static int calculateSize(int destination) {
        int sqrtOfDestination = calculateWholeRoundedUpSqrtOf(destination);

        if(isEven(sqrtOfDestination))
            return (int) Math.pow(sqrtOfDestination + 1, 2);

        else
            return (int) Math.pow(sqrtOfDestination, 2);
    }

    private static int calculateWholeRoundedUpSqrtOf(int destination) {
        double sqrtOfDestination = Math.sqrt(destination);

        // if sqrt of destination isn't whole number round it up (i.e. 6.85 -> 7)
        if( sqrtOfDestination % 1 != 0)
            return (int) Math.ceil(sqrtOfDestination);
        else
            return (int) sqrtOfDestination;
    }

    private static boolean isEven(int x) {
        // false - odd number (3, 5, 7, 9,...)
        // true - even number (2, 4, 6, 8,...)

        return (x % 2 == 0);
    }

    private static int calculateDistance(int destination, int memorySize) {
        if(destination == 1)
            return 0;

        if(destination < 10)
            return 1;

        int sqrtOfDestination = calculateWholeRoundedUpSqrtOf(destination);
        int destinationsSpiral;

        if(isEven(sqrtOfDestination))
            destinationsSpiral = (sqrtOfDestination)/2;
        else
            destinationsSpiral = (sqrtOfDestination - 1)/2;

        int startingX = (int) (Math.sqrt(memorySize) - 1) / 2;
        int startingY = (int) (Math.sqrt(memorySize) - 1) / 2;

        int cornerValue;

        // right boundary
        if( spiralMemory[startingX + destinationsSpiral][startingY - destinationsSpiral] >= destination )
            cornerValue = spiralMemory[startingX + destinationsSpiral][startingY - destinationsSpiral];

        // top boundary
        else if( spiralMemory[startingX - destinationsSpiral][startingY - destinationsSpiral] >= destination)
            cornerValue = spiralMemory[startingX - destinationsSpiral][startingY - destinationsSpiral];

        // left boundary
        else if( spiralMemory[startingX - destinationsSpiral][startingY + destinationsSpiral] >= destination)
            cornerValue = spiralMemory[startingX - destinationsSpiral][startingY + destinationsSpiral];

        // bottom boundary
        else
            cornerValue = spiralMemory[startingX + destinationsSpiral][startingY + destinationsSpiral];


        // destination is on the right side of boundary
        if (cornerValue - destination > destinationsSpiral)
            return cornerValue - destination;

        // destination is in the middle of boundary
        else if( cornerValue - destination == destinationsSpiral)
            return destinationsSpiral;

        // destination is at corner of boundary
        else if(cornerValue == destination)
            return destinationsSpiral*2;

        // destination is on the left side of boundary
        else
            return 2*destinationsSpiral - (cornerValue - destination);
    }

    private static int sumNeighbours(int x, int y) {
        int sum = 0;

        for(int i = -1; i < 2; i++) {
            for(int j = -1; j < 2; j++) {
                sum += spiralMemory[x+i][y+j];
            }
        }

        return sum;
    }

    public static void main(String args[]) {
        int destination = 200;
        int memorySize = calculateSize(destination);

        createSpiralMemoryPartTwo(memorySize);

        for(int i = 0; i < Math.sqrt(memorySize); i++) {
            for(int j = 0; j < Math.sqrt(memorySize); j++) {
                System.out.printf("%7d ", spiralMemory[j][i]);
            }
            System.out.println();
        }

        //System.out.println();
        //System.out.println("Steps to square " + destination + ": " + calculateDistance(destination, memorySize));


    }
}
