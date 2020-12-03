import util


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


def parse_points_list(raw_input):
    points_list = []

    for line in raw_input:
        current_index = 0
        x = []
        while line[current_index] != ',':
            x.append(line[current_index])
            current_index += 1

        current_index += 2
        y = []
        while line[current_index] != '\n':
            y.append(line[current_index])
            current_index += 1

        points_list.append(Point(int("".join(x)), int("".join(y))))

    return points_list


def find_max_coordinates(points_list):
    max_x = 0
    max_y = 0

    for point in points_list:
        if point.x > max_x:
            max_x = point.x

        if point.y > max_y:
            max_y = point.y

    return max_x, max_y


def calculate_dist(p1, p2):
    return abs(p1.x - p2.x) + abs(p1.y - p2.y)


def create_board_for_first_puzzle(points_list, max_x, max_y):
    board = [["x"] * (max_y + 1) for i in range(max_x + 1)]

    for x in range(0, max_x):
        for y in range(0, max_y):
            min_dist = 9999

            for point in points_list:
                current_dist = calculate_dist(point, Point(x, y))

                if current_dist < min_dist:
                    min_dist = current_dist
                    board[x][y] = points_list.index(point)

                elif current_dist == min_dist:
                    board[x][y] = "."
                    continue

    return board


def resolve_first_puzzle(board, points_list, max_x, max_y):
    infinite_areas = set()

    for i in range(max_x):
        infinite_areas.add(board[i][0])
        infinite_areas.add(board[i][max_y])

    for i in range(max_y):
        infinite_areas.add(board[0][i])
        infinite_areas.add(board[max_x][i])

    largest_area = 0
    for point in range(points_list.__len__()):

        if point in infinite_areas:
            continue

        counter = 0

        for x in range(max_x):
            for y in range(max_y):
                if board[x][y] == point:
                    counter += 1

        if counter > largest_area:
            largest_area = counter

    print("Largest area: " + str(largest_area))


def resolve_second_puzzle(points_list, max_x, max_y):
    safe_region_size = 0

    for x in range(0, max_x):
        for y in range(0, max_y):
            total_dist = 0

            for point in points_list:
                total_dist += calculate_dist(point, Point(x, y))

            if total_dist < 10000:
                safe_region_size += 1

    print("Safe region size: " + str(safe_region_size))


raw_input = util.read_input_from_file("input-files/day-6.txt")
parsed_list = parse_points_list(raw_input)
(max_x, max_y) = find_max_coordinates(parsed_list)
board = create_board_for_first_puzzle(parsed_list, max_x, max_y)
resolve_first_puzzle(board, parsed_list, max_x, max_y)
resolve_second_puzzle(parsed_list, max_x, max_y)
