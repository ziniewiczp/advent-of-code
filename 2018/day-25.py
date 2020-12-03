import util
import re


class Point:
    def __init__(self, t, x, y, z):
        self.t = t
        self.x = x
        self.y = y
        self.z = z


def create_points_list(raw_input):
    points_list = []

    for line in raw_input:
        pattern = re.compile(r"(?P<t>.*?),(?P<x>.*?),(?P<y>.*?),(?P<z>.*?)\n")
        match = pattern.match(line)

        point = Point(
            int(match.group("t")),
            int(match.group("x")),
            int(match.group("y")),
            int(match.group("z"))
        )

        points_list.append(point)

    return points_list


def calculate_distance(first_point, second_point):
    return abs(first_point.t - second_point.t) + abs(first_point.x - second_point.x) \
           + abs(first_point.y - second_point.y) + abs(first_point.z - second_point.z)


def fit_into_constellation(constellations, new_point):
    for constellation in constellations:
        for point in constellation:
            if calculate_distance(new_point, point) < 4:
                constellation.append(new_point)
                return True

    return False


def merge_constellations(first_constellation, second_constellation):
    for first_point in first_constellation:
        for second_point in second_constellation:
            if calculate_distance(first_point, second_point) < 4:
                first_constellation += second_constellation
                return True

    return False


def compare_constellations(current_constellation, constellations):
    for constellation in constellations:
        if constellation == current_constellation:
            continue

        else:
            if merge_constellations(current_constellation, constellation):
                constellations.remove(constellation)

    return constellations


raw_input = util.read_input_from_file("input-files/day-25.txt")
points = create_points_list(raw_input)

constellations = []

for new_point in points:
    if len(constellations) == 0 or not fit_into_constellation(constellations, new_point):
        new_constellation = [new_point]
        constellations.append(new_constellation)

for i in range(3):
    for constellation in constellations:
        constellations = compare_constellations(constellation, constellations)

print("Number of constellations: " + str(len(constellations)))
