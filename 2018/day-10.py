import util

MAX_VALUE = 2**63 - 1


class Point:
    def __init__(self, x, y, v1, v2):
        self.x = x
        self.y = y
        self.v1 = v1
        self.v2 = v2


def parse_points_list(raw_input):
    points_list = []

    for line in raw_input:
        current_index = 10

        if line[current_index] == " ":
            current_index += 1

        x = []
        while line[current_index] != ",":
            x.append(line[current_index])
            current_index += 1

        current_index += 2
        if line[current_index] == " ":
            current_index += 1

        y = []
        while line[current_index] != ">":
            y.append(line[current_index])
            current_index += 1

        while line[current_index] != "<":
            current_index += 1

        current_index += 1
        if line[current_index] == " ":
            current_index += 1

        v1 = []
        while line[current_index] != ",":
            v1.append(line[current_index])
            current_index += 1

        current_index += 2
        if line[current_index] == " ":
            current_index += 1

        v2 = []
        while line[current_index] != ">":
            v2.append(line[current_index])
            current_index += 1

        points_list.append(Point(int("".join(x)), int("".join(y)), int("".join(v1)), int("".join(v2))))

    return points_list


def update_points_list(points_list):
    for point in points_list:
        point.x += point.v1
        point.y += point.v2

    return points_list


def calculate_extremes(points_list):
    min_x = MAX_VALUE
    min_y = MAX_VALUE
    max_x = -MAX_VALUE
    max_y = -MAX_VALUE

    for point in points_list:
        if point.x < min_x:
            min_x = point.x

        if point.x > max_x:
            max_x = point.x

        if point.y < min_y:
            min_y = point.y

        if point.y > max_y:
            max_y = point.y

    return min_x, min_y, max_x, max_y


def draw_grid(points_list):
    (min_x, min_y, max_x, max_y) = calculate_extremes(points_list)

    current_y = min_y
    current_x = min_x

    point_found = False

    while current_y <= max_y:
        while current_x <= max_x:
            for point in points_list:
                if point.x == current_x and point.y == current_y:
                    print("#", end=" ")
                    point_found = True
                    break

            if not point_found:
                print(".", end=" ")

            else:
                point_found = False

            current_x += 1

        print()
        current_x = min_x
        current_y += 1


raw_input = util.read_input_from_file("input-files/day-10.txt")
points_list = parse_points_list(raw_input)

smallest_box = MAX_VALUE
smallest_box_second = 0

for i in range(1, 100000):
    points_list = update_points_list(points_list)
    (min_x, min_y, max_x, max_y) = calculate_extremes(points_list)

    width = abs(max_x - min_x)
    height = abs(max_y - min_y)

    box_area = width * height

    if box_area < smallest_box:
        smallest_box = box_area
        smallest_box_second = i

points_list = parse_points_list(raw_input)

for i in range(smallest_box_second):
    update_points_list(points_list)

draw_grid(points_list)

print(smallest_box_second)
