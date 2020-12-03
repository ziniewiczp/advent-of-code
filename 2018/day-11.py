from math import floor

serial_number = 9306
partial_sums_grid = [[0 for y in range(300)] for x in range(300)]


def calculate_single_cell(x, y):
    rack_id = x + 10
    power_level = rack_id * y
    power_level += serial_number
    power_level *= rack_id
    power_digit = floor((power_level/100) % 10)
    power_digit -= 5

    return power_digit


def get_partial_sum_for(x, y):
    if x < 0 or y < 0:
        return 0

    else:
        return partial_sums_grid[x][y]


def create_partial_sums_grid(grid):

    for x in range(300):
        for y in range(300):
            if x == 0 or y == 0:
                partial_sums_grid[x][y] = grid[x][y]

            else:
                partial_sums_grid[x][y] = grid[x][y] + get_partial_sum_for(x-1, y) + get_partial_sum_for(x, y-1) \
                                          - get_partial_sum_for(x-1, y-1)


def calculate_largest_power_area(max_size):
    largest_total_power = -1e9
    largest_total_power_cell = None
    largest_total_power_grid_size = -1e9

    for size in range(1, max_size + 1):
        for x in range(1, 301 - size):
            for y in range(1, 301 - size):

                current_total_power = get_partial_sum_for(x, y) - get_partial_sum_for(x-size, y) \
                                        - get_partial_sum_for(x, y-size) + get_partial_sum_for(x-size, y-size)

                if current_total_power > largest_total_power:
                    largest_total_power = current_total_power
                    largest_total_power_cell = (x - size + 1, y - size + 1)
                    largest_total_power_grid_size = size

    print('Coordinates: ' + str(largest_total_power_cell) + '; Grid size: ' + str(largest_total_power_grid_size))


raw_grid = [[calculate_single_cell(x, y) for y in range(300)] for x in range(300)]
create_partial_sums_grid(raw_grid)
calculate_largest_power_area(300)
