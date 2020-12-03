import util

def move_carts(map):
    for x in range(len(map)):
        for y in range(len(map[x])):
            if map[x][y] == ">":
                if map[x+1][y] == "-":
                    if y == 0 or map[x][y - 1] == "|":
                        map[x][y] = "+"

                    else:
                        map[x][y] = "-"

                    map[x+1][y] = ">"

            elif map[x][y] == "<":
                pass

            elif map[x][y] == "v":
                pass

            elif map[x][y] == "^":
                pass

    return map


def print_map(map):
    for row in map:
        for char in row:
            print(char, end=" ")


map = util.read_input_from_file("input-files/day-13.txt")
print_map(map)

for i in range(5):
    move_carts(map)
    print_map(map)
