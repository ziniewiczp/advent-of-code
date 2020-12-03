import util
from string import ascii_lowercase


def resolve_first_puzzle(ids):
    ids_with_letters_appearing_two_times = set()
    ids_with_letters_appearing_three_times = set()

    for id in ids:
        current_id = []
        letters_appearing_two_times = []
        letters_appearing_three_times = []

        for letter in id:
            if letter in current_id:
                if letter in letters_appearing_two_times:
                    if letter in letters_appearing_three_times:
                        continue

                    else:
                        ids_with_letters_appearing_three_times.add(id)
                        letters_appearing_three_times.append(letter)
                        letters_appearing_two_times.remove(letter)

                        if not letters_appearing_two_times:
                            ids_with_letters_appearing_two_times.remove(id)

                else:
                    letters_appearing_two_times.append(letter)
                    ids_with_letters_appearing_two_times.add(id)

            current_id.append(letter)

    print("Checksum: " + str(len(ids_with_letters_appearing_two_times) * len(ids_with_letters_appearing_three_times)))


def resolve_second_puzzle(ids):
    for id in ids:
        for i in range(0, id.__len__()-1):
            current_id = id
            for letter in ascii_lowercase:
                current_id = current_id[:i] + letter + current_id[i+1:]
                if current_id in ids and current_id != id:
                    for i in range(0, id.__len__()-1):
                        if current_id[i] != id[i]:
                            id = id[:i] + id[i+1:]
                            print("Common letters between the two correct IDs: " + id)
                            return


input_data = util.read_input_from_file("input-files/day-2.txt")
resolve_first_puzzle(input_data)
resolve_second_puzzle(input_data)
