public class Day20 {

    private class Particle {
        int[] position;
        int[] velocity;
        int[] acceleration;

        public void setPosition(int x, int y, int z) {
            this.position[0] = x;
            this.position[1] = y;
            this.position[2] = z;
        }

        public void setVelocity(int x, int y, int z) {
            this.velocity[0] = x;
            this.velocity[1] = y;
            this.velocity[2] = z;
        }

        public void setAcceleration(int x, int y, int z) {
            this.position[0] = x;
            this.position[1] = y;
            this.position[2] = z;
        }
    }
}
