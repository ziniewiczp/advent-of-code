from string import ascii_letters, ascii_lowercase


def resolve_first_puzzle(polymer):
    current_index = 0

    while polymer.__len__() - 1 > current_index:
        current_letter_index = ascii_letters.find(polymer[current_index])

        if current_letter_index < 26:
            current_letter_equivalent = current_letter_index + 26

        else:
            current_letter_equivalent = current_letter_index - 26

        if polymer[current_index + 1] == ascii_letters[current_letter_equivalent]:
            del polymer[current_index:current_index + 2]
            if current_index > 0:
                current_index -= 1

        else:
            current_index += 1

    print("Units remaining after fully reacting: " + str(polymer.__len__()))
    return polymer.__len__()


def resolve_second_puzzle(polymer):
    shortest_polymer_length = 9999

    for letter in ascii_lowercase:
        letter_index = ascii_letters.find(letter)
        letter_uppercase = ascii_letters[letter_index + 26]

        temp_polymer = polymer

        temp_polymer = list(filter(lambda a: a != letter and a != letter_uppercase, temp_polymer))
        temp_polymer_length = resolve_first_puzzle(temp_polymer)

        if temp_polymer_length < shortest_polymer_length:
            shortest_polymer_length = temp_polymer_length

    print("Shortest polymer we can produce: " + str(shortest_polymer_length))


input_file = open("input-files/day-5.txt", "r")
input_data = input_file.read()

input_list = []
for char in input_data:
    input_list.append(char)

resolve_first_puzzle(input_list)
resolve_second_puzzle(input_list)
