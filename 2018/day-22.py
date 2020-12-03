class Rectangle:
    def __init__(self, erosion_level, rectangle_type):
        self.erosion_level = erosion_level
        self.rectangle_type = rectangle_type


depth = 3558
target = (15, 740)

caveMap = [[None for i in range(target[1] + 1)] for j in range(target[0] + 1)]

risk_level = 0

for x in range(target[0] + 1):
    for y in range(target[1] + 1):
        if (x, y) == (0, 0) or (x, y) == target:
            geo_index = 0

        elif y == 0:
            geo_index = x * 16807

        elif x == 0:
            geo_index = y * 48271

        else:
            geo_index = caveMap[x - 1][y].erosion_level * caveMap[x][y - 1].erosion_level

        erosion_level = (geo_index + depth) % 20183
        rectangle_type = erosion_level % 3
        risk_level += rectangle_type

        caveMap[x][y] = Rectangle(erosion_level, rectangle_type)

print('Risk level: ' + str(risk_level))
