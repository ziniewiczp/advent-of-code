import util

def process_input(raw_input):

    processed_input = []

    for element in raw_input:
        sign = element[0]

        number = ""

        for i in range(1, element.__len__()):
            number += element[i]

        processed_input.append((sign, int(number)))

    return processed_input


def resolve_first_puzzle(processed_input):
    frequency = 0

    for frequency_change in processed_input:
        if frequency_change[0] == "+":
            frequency += frequency_change[1]

        else:
            frequency -= frequency_change[1]

    print("Final frequency is: " + str(frequency))


def resolve_second_puzzle(processed_input):
    frequency = 0
    frequencies = [0]
    first_duplicate = 0
    current_index = 0

    while True:
        if current_index == processed_input.__len__():
            current_index = 0

        if processed_input[current_index][0] == "+":
            frequency += processed_input[current_index][1]

        else:
            frequency -= processed_input[current_index][1]

        if frequency in frequencies:
            first_duplicate = frequency
            break

        frequencies.append(frequency)

        current_index += 1

    print("First frequency to be reach twice is: " + str(first_duplicate))


raw_input = util.read_input_from_file("input-files/day-1.txt")
processed_input = process_input(raw_input)
resolve_first_puzzle(processed_input)
resolve_second_puzzle(processed_input)
