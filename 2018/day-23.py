import util
import re


class Nanobot:
    def __init__(self, x, y, z, range):
        self.x = x
        self.y = y
        self.z = z
        self.range = range


def create_nanobots_list(raw_input):
    nanobots = []
    nanobot_with_highest_range = None

    for line in raw_input:
        pattern = re.compile(
            r"^pos=<(?P<x>.*?),(?P<y>.*?),(?P<z>.*?)>,\sr=(?P<range>.*?)\n")
        match = pattern.match(line)

        x = int(match.group("x"))
        y = int(match.group("y"))
        z = int(match.group("z"))
        range = int(match.group("range"))

        current_nanobot = Nanobot(x, y, z, range)

        if nanobot_with_highest_range is None or range > nanobot_with_highest_range.range:
            nanobot_with_highest_range = current_nanobot

        nanobots.append(current_nanobot)

    return nanobots, nanobot_with_highest_range


def calculate_distance(first_nanobot, second_nanobot):
    return abs(first_nanobot.x - second_nanobot.x) + abs(first_nanobot.y - second_nanobot.y) \
           + abs(first_nanobot.z - second_nanobot.z)


def create_nanobots_in_range_list(nanobots, nanobot_with_highest_range):
    nanobots_in_range = []

    for nanobot in nanobots:
        distance = calculate_distance(nanobot, nanobot_with_highest_range)

        if distance <= nanobot_with_highest_range.range:
            nanobots_in_range.append(nanobot)

    return nanobots_in_range


def get_coordinates_in_range_of_most_nanobots(nanobots):
    pass


file_input = util.read_input_from_file("input-files/day-23.txt")
nanobots_list, strongest_nanobot = create_nanobots_list(file_input)
nanobots_in_range_of_strongest = create_nanobots_in_range_list(nanobots_list, strongest_nanobot)
print("There's " + str(len(nanobots_in_range_of_strongest)) + " nanobots in signal radius of the strongest nanobot.")
