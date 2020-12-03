class Node:
    def __init__(self):
        self.children_count = None
        self.metadata_count = None
        self.children = []
        self.metadata = []
        self.parent = None
        self.sum = 0


def create_node():
    global current_index
    global raw_input

    node = Node()

    children_count = []
    while raw_input[current_index] != " ":
        children_count.append(raw_input[current_index])
        current_index += 1

    current_index += 1
    metadata_count = []
    while raw_input[current_index] != " ":
        metadata_count.append(raw_input[current_index])
        current_index += 1

    current_index += 1
    node.children_count = int("".join(children_count))
    node.metadata_count = int("".join(metadata_count))

    for i in range(node.children_count):
        child = create_node()
        child.parent = node
        node.children.append(child)

    for i in range(node.metadata_count):
        metadata = []
        while current_index < raw_input.__len__() and raw_input[current_index] != " ":
            metadata.append(raw_input[current_index])
            current_index += 1

        current_index += 1
        node.metadata.append(int("".join(metadata)))

    return node


def sum_metadata(node):
    sum = 0

    for child in node.children:
        sum += sum_metadata(child)

    for metadata in node.metadata:
        sum += metadata

    node.sum = sum

    return node.sum


def sum_metadata_part_2(node):
    for child in node.children:
        sum_metadata_part_2(child)

    for metadata in node.metadata:
        if metadata <= node.children_count:
            node.sum += node.children[metadata - 1].sum

    if node.children_count > 0:
        return

    for metadata in node.metadata:
        node.sum += metadata


current_index = 0
input_file = open("input-files\day-8.txt", "r")
raw_input = input_file.read()

root = create_node()
sum_metadata(root)
print(root.sum)

current_index = 0
root = create_node()
sum_metadata_part_2(root)
print(root.sum)
