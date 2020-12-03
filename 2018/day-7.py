import util
from string import ascii_uppercase


class Worker:
    def __init__(self, number, occupied_for):
        self.number = number
        self.occupied_for = occupied_for
        self.working_on = None


available_steps = set()
steps_with_fulfilled_prerequisites = []
steps_performed = []
prerequisites = [[] for i in range(ascii_uppercase.__len__())]

workers_count = 5
workers = []
busy_workers = set()

for i in range(workers_count):
    workers.append(Worker(i, 0))

raw_input = util.read_input_from_file("input-files/day-7.txt")

for line in raw_input:
    prerequisites[ascii_uppercase.find(line[36])].append(line[5])
    available_steps.add(line[5])
    available_steps.add(line[36])

for i in range(prerequisites.__len__()):
    if not prerequisites[i] and ascii_uppercase[i] in available_steps and ascii_uppercase[i] not in steps_with_fulfilled_prerequisites:
        steps_with_fulfilled_prerequisites.append(ascii_uppercase[i])

steps_with_fulfilled_prerequisites.sort()

timer = 0

while available_steps.__len__() > 0 or busy_workers:

    for worker in workers:
        if worker.occupied_for > 1:
            worker.occupied_for -= 1

        elif worker.occupied_for == 1:
            steps_performed.append(worker.working_on)

            for prerequisite in prerequisites:
                if prerequisite.__contains__(worker.working_on):
                    prerequisite.remove(worker.working_on)

            for i in range(prerequisites.__len__()):
                if not prerequisites[i] and ascii_uppercase[i] in available_steps and ascii_uppercase[i] not in steps_with_fulfilled_prerequisites:
                    steps_with_fulfilled_prerequisites.append(ascii_uppercase[i])

            steps_with_fulfilled_prerequisites.sort()

            worker.working_on = None
            worker.occupied_for = 0
            busy_workers.remove(worker)

        if worker.working_on is None and steps_with_fulfilled_prerequisites:
            current_step = steps_with_fulfilled_prerequisites.pop(0)
            available_steps.remove(current_step)
            worker.occupied_for = ascii_uppercase.find(current_step) + 61
            worker.working_on = current_step
            busy_workers.add(worker)

    timer += 1

print("Steps performed: " + "".join(steps_performed) + " in " + str(timer) + " seconds.")
