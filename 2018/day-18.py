import util


def convert_input(input):
    array = []
    for line in input:
        row = []
        for char in line:
            row.append(char)

        array.append(row)

    return array


def perform_change(current_area, new_area, x, y):
    wooded_acres = lumberyards = open_acres = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if (i == 0 and j == 0) or x + i < 0 or x + i > width - 1 or y + j < 0 or y + j > height - 1:
                continue

            else:
                current_acre = current_area[x + i][y + j]

                if current_acre == '.':
                    open_acres += 1

                elif current_acre == '#':
                    lumberyards += 1

                elif current_acre == '|':
                    wooded_acres += 1

    if current_area[x][y] == '.' and wooded_acres > 2:
        new_area[x][y] = '|'

    elif current_area[x][y] == '|' and lumberyards > 2:
        new_area[x][y] = '#'

    elif current_area[x][y] == '#' and (wooded_acres == 0 or lumberyards == 0):
        new_area[x][y] = '.'

    else:
        new_area[x][y] = current_area[x][y]


minutes = 10

raw_input = util.read_input_from_file("input-files/day-18.txt")
current_area = convert_input(raw_input)
height = width = len(current_area)

for i in range(minutes):
    new_area = [['.' for y in range(height)] for x in range(width)]
    total_wooded_acres = total_lumberyards = 0

    for x in range(width):
        for y in range(height):
            perform_change(current_area, new_area, x, y)

            if new_area[x][y] == '|':
                total_wooded_acres += 1

            elif new_area[x][y] == '#':
                total_lumberyards += 1

    current_area = new_area

    print('Total resource value after ' + str(i + 1) + ' minutes: ' + str(total_wooded_acres * total_lumberyards))
