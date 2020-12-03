import util
import re
import importlib

day_16 = importlib.import_module("day-16")


def perform_instruction(method, values, registers, const_ip, ip):
    registers[const_ip] = ip
    method_to_call = getattr(day_16, method)
    registers = method_to_call(registers, values)

    return registers, registers[const_ip] + 1


instructions = util.read_input_from_file("input-files/day-19.txt")
const_ip = int(instructions[0][4])
ip = 0

registers = [1, 0, 0, 0, 0, 0]

while ip < len(instructions) - 1:
    current_instruction = instructions[ip + 1]

    pattern = re.compile(r"^(?P<method>.*?)\s(?P<value1>.*?)\s(?P<value2>.*?)\s(?P<value3>.*?)\n")
    match = pattern.match(current_instruction)

    method = match.group("method")
    values = [0, 0, 0, 0]
    for i in range(1, 4):
        values[i] = int(match.group("value" + str(i)))

    registers, ip = perform_instruction(method, values, registers, const_ip, ip)
    print(registers)

print(registers)
