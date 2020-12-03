class Node:
    def __init__(self, marble, next, prev):
        self.marble = marble
        self.next = next
        self.prev = prev


players_count = 463
last_marble = 71787

players_score = [0] * players_count

first_node = Node(0, None, None)
current_node = Node(1, first_node, first_node)
first_node.next = current_node
first_node.prev = current_node

current_player = 2

for current_marble in range(2, last_marble + 1):

    if current_marble % 23 == 0:
        players_score[current_player - 1] += current_marble

        for i in range(7):
            current_node = current_node.prev

        players_score[current_player - 1] += current_node.marble

        previous_node = current_node.prev
        current_node = current_node.next
        current_node.prev = previous_node
        previous_node.next = current_node

    else:
        first_clockwise = current_node.next
        second_clockwise = current_node.next.next
        new_node = Node(current_marble, second_clockwise, first_clockwise)
        first_clockwise.next = new_node
        second_clockwise.prev = new_node
        current_node = new_node

    current_player += 1

    if current_player > players_count:
        current_player = 1

print("Highest score: " + str(max(players_score)))
