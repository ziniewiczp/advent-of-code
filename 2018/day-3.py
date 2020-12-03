import util


class Claim:
    def __init__(self, id, x, y, width, length):
        self.id = id
        self.x = x
        self.y = y
        self.width = width
        self.length = length

    @staticmethod
    def parse_claim(raw_claim):
        id = []
        x = []
        y = []
        width = []
        length = []

        current_index = 1

        while raw_claim[current_index] != " ":
            id.append(raw_claim[current_index])
            current_index += 1

        id = "".join(id)

        current_index += 3
        while raw_claim[current_index] != ",":
            x.append(raw_claim[current_index])
            current_index += 1

        x = "".join(x)

        current_index += 1
        while raw_claim[current_index] != ':':
            y.append(raw_claim[current_index])
            current_index += 1

        y = "".join(y)

        current_index += 2
        while raw_claim[current_index] != 'x':
            width.append(raw_claim[current_index])
            current_index += 1

        width = "".join(width)

        current_index += 1
        while raw_claim[current_index] != "\n":
            length.append(raw_claim[current_index])
            current_index += 1

        length = "".join(length)

        return Claim(int(id), int(x), int(y), int(width), int(length))


def resolve_both_puzzles(claims):
    fabric = [[0] * 1000 for i in range(1000)]

    overlapping_claim_ids = set()
    claim_ids = set()

    for raw_claim in claims:
        parsed_claim = Claim.parse_claim(raw_claim)
        claim_ids.add(parsed_claim.id)
        x = parsed_claim.x
        y = parsed_claim.y

        for i in range(0, parsed_claim.width):
            for j in range(0, parsed_claim.length):
                if fabric[x][y] == 0:
                    fabric[x][y] = parsed_claim.id
                else:
                    overlapping_claim_ids.add(parsed_claim.id)
                    overlapping_claim_ids.add(fabric[x][y])
                    fabric[x][y] = "X"

                y += 1
            x += 1
            y = parsed_claim.y

    counter = 0

    for i in range(0, 1000):
        for j in range(0, 1000):
            if fabric[i][j] == "X":
                counter += 1

    print("Square inches of fabric withing two or more claims: " + str(counter))

    print("The one claim that doesn't overlap: " + str(claim_ids - overlapping_claim_ids))


input_data = util.read_input_from_file("input-files/day-3.txt")
resolve_both_puzzles(input_data)
