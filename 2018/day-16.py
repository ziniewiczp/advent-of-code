import util
import re


def addr(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] + registers[instructions[2]]
    return registers


def addi(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] + instructions[2]
    return registers


def mulr(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] * registers[instructions[2]]
    return registers


def muli(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] * instructions[2]
    return registers


def banr(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] & registers[instructions[2]]
    return registers


def bani(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] & instructions[2]
    return registers


def borr(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] | registers[instructions[2]]
    return registers


def bori(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]] | instructions[2]
    return registers


def setr(registers, instructions):
    registers[instructions[3]] = registers[instructions[1]]
    return registers


def seti(registers, instructions):
    registers[instructions[3]] = instructions[1]
    return registers


def gtir(registers, instructions):
    if instructions[1] > registers[instructions[2]]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def gtri(registers, instructions):
    if registers[instructions[1]] > instructions[2]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def gtrr(registers, instructions):
    if registers[instructions[1]] > registers[instructions[2]]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def eqir(registers, instructions):
    if instructions[1] == registers[instructions[2]]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def eqri(registers, instructions):
    if registers[instructions[1]] == instructions[2]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def eqrr(registers, instructions):
    if registers[instructions[1]] == registers[instructions[2]]:
        registers[instructions[3]] = 1

    else:
        registers[instructions[3]] = 0

    return registers


def resolve_first_puzzle(samples):
    sample_counter = 0

    before = [0, 0, 0, 0]
    after = [0, 0, 0, 0]
    instructions = [0, 0, 0, 0]

    methods = {
        "addr": [],
        "addi": [],
        "mulr": [],
        "muli": [],
        "banr": [],
        "bani": [],
        "borr": [],
        "bori": [],
        "setr": [],
        "seti": [],
        "gtir": [],
        "gtri": [],
        "gtrr": [],
        "eqir": [],
        "eqri": [],
        "eqrr": []
    }

    for line in samples:
        if line == "TEST PROGRAM:\n":
            break

        if line[0].isdigit():
            pattern = re.compile(
                r"(?P<opcode>.*?)\s(?P<a>.*?)\s(?P<b>.*?)\s(?P<c>.*?)\n")
            match = pattern.match(line)

            instructions[0] = int(match.group("opcode"))
            instructions[1] = int(match.group("a"))
            instructions[2] = int(match.group("b"))
            instructions[3] = int(match.group("c"))

        elif line[0] != "\n":
            pattern = re.compile(
                r"(Before|After):\s*\[(?P<register0>.*?),\s(?P<register1>.*?),\s(?P<register2>.*?),\s(?P<register3>.*?)]\n")
            match = pattern.match(line)

            if line[0] == "B":
                for i in range(4):
                    before[i] = int(match.group("register" + str(i)))

            elif line[0] == "A":
                for i in range(4):
                    after[i] = int(match.group("register" + str(i)))

        else:
            counter = 0
            for method in methods:
                if globals()[method](list(before), instructions) == after:
                    counter += 1
                    methods[method].append(instructions[0])

            if counter >= 3:
                sample_counter += 1

    print("Samples behaving like three or more opcodes: " + str(sample_counter))
    return methods


def assign_opcodes(methods):
    opcodes = {
        "addr": None,
        "addi": None,
        "mulr": None,
        "muli": None,
        "banr": None,
        "bani": None,
        "borr": None,
        "bori": None,
        "setr": None,
        "seti": None,
        "gtir": None,
        "gtri": None,
        "gtrr": None,
        "eqir": None,
        "eqri": None,
        "eqrr": None
    }

    assigned_opcodes = []

    all_single_values_assigned = False

    while not all_single_values_assigned:
        all_single_values_assigned = True

        for method in methods:
            if opcodes[method] is None:
                for assigned_opcode in assigned_opcodes:
                    methods[method] = list(filter(lambda x: x != assigned_opcode, methods[method]))

                if len(set(methods[method])) == 1:
                    all_single_values_assigned = False
                    opcodes[method] = methods[method][0]
                    assigned_opcodes.append(opcodes[method])

    return opcodes


def resolve_second_puzzle(opcodes, instructions):
    registers = [0, 0, 0, 0]

    ignore_lines = True

    for line in instructions:
        if line == "TEST PROGRAM:\n":
            ignore_lines = False
            continue

        if ignore_lines or line == "\n":
            continue

        else:
            pattern = re.compile(
                r"(?P<opcode>.*?)\s(?P<a>.*?)\s(?P<b>.*?)\s(?P<c>.*?)\n")
            match = pattern.match(line)

            instructions[0] = int(match.group("opcode"))
            instructions[1] = int(match.group("a"))
            instructions[2] = int(match.group("b"))
            instructions[3] = int(match.group("c"))

            for method in opcodes:
                if opcodes[method] == instructions[0]:
                    globals()[method](registers, instructions)

    print("Value in register 0 after executing the test program: " + str(registers[0]))


raw_input = util.read_input_from_file("input-files/day-16.txt")
opcodes_occurrences = resolve_first_puzzle(raw_input)
opcodes = assign_opcodes(opcodes_occurrences)
resolve_second_puzzle(opcodes, raw_input)
