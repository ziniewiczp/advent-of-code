import util
import re


def set_initial_state(raw_notes):
    pattern = re.compile(r"^initial\sstate:\s(?P<initial_state>.*?)\n")
    match = pattern.match(raw_notes[0])

    state = match.group("initial_state")
    return ("." * 20) + state + ("." * 50)


def parse_notes(raw_notes):
    notes = dict()

    for line in raw_notes:
        if "initial state" in line or line == "\n":
            continue

        else:
            pattern = re.compile(r"^(?P<combination>.*?)\s=>\s(?P<result>.*?)\n")
            match = pattern.match(line)

            notes[match.group("combination")] = match.group("result")

    return notes


def simulate_plants_growth(initial_state, notes, generations):
    current_state = list(initial_state)

    print("{:02d}".format(0) + ": " + "".join(current_state))

    for generation in range(1, generations + 1):
        next_generation_state = ["." for x in range(len(current_state))]

        for i in range(2, len(current_state) - 2):
            LLCRR = "".join(current_state[i-2:i+3])

            if LLCRR in notes:
                next_generation_state[i] = notes[LLCRR]

            else:
                next_generation_state[i] = "."

        print("{:02d}".format(generation) + ": " + "".join(next_generation_state))
        current_state = next_generation_state

    return current_state


def resolve_first_puzzle(state):
    sum = 0

    for pot_number in range(len(state)):
        if state[pot_number] == "#":
            sum += pot_number - 20

    print("Sum of numbers of all pots which contain a plant: " + str(sum))


def resolve_second_puzzle():
    #x_n = 4084 + 38n
    pass


raw_input = util.read_input_from_file("input-files/day-12.txt")
initial_state = set_initial_state(raw_input)
notes = parse_notes(raw_input)
plants_state = simulate_plants_growth(initial_state, notes, 20)
resolve_first_puzzle(plants_state)
