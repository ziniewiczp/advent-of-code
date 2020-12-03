import util
import datetime
import statistics


class ListEntry:
    def __init__(self, date, action):
        self.date = date
        self.action = action


class GuardScheduleEntry:
    def __init__(self, id, time_asleep):
        self.id = id
        self.time_asleep = time_asleep
        self.minutes_asleep = []
        self.mode = -1


def parse_input(input_data):
    input_data.sort()

    processed_input = []

    for entry in input_data:
        year = entry[1:5]
        month = entry[6:8]
        day = entry[9:11]
        hour = entry[12:14]
        minutes = entry[15:17]
        date = datetime.datetime(int(year), int(month), int(day), int(hour), int(minutes))
        if entry[19] == "G":
            guard_id = []
            current_index = 26

            while entry[current_index] != " ":
                guard_id.append(entry[current_index])
                current_index += 1

            action = "".join(guard_id)

        elif entry[19] == "f":
            action = "falls asleep"

        else:
            action = "wakes up"

        processed_input.append(ListEntry(date, action))

    return processed_input


def flatten(nested_list):
    flat_list = []

    for sublist in nested_list:
        for item in sublist:
            flat_list.append(item)

    return flat_list


def create_guards_schedule(input_data):
    current_guard = None

    guards_schedule = []

    for entry in input_data:
        if entry.action.isdigit():
            current_guard = None

            for guard in guards_schedule:
                if guard.id == entry.action:
                    current_guard = guard

            if current_guard is None:
                current_guard = GuardScheduleEntry(entry.action, datetime.timedelta())
                guards_schedule.append(current_guard)

        elif entry.action == "falls asleep":
            date_fallen_asleep = entry.date

        else:
            date_woken_up = entry.date
            difference = date_woken_up - date_fallen_asleep
            current_guard.time_asleep += difference

            minute_fallen_asleep = date_fallen_asleep.minute
            minute_woken_up = date_woken_up.minute

            minutes_of_recent_sleep = list(range(minute_fallen_asleep, minute_woken_up))
            current_guard.minutes_asleep.append(minutes_of_recent_sleep)

    for guard in guards_schedule:
        guard.minutes_asleep = flatten(guard.minutes_asleep)
        try:
            guard.mode = statistics.mode(guard.minutes_asleep)

        except statistics.StatisticsError:
            pass

    return guards_schedule


def resolve_first_puzzle(guards_schedule):
    most_sleepy_guard = guards_schedule[0]

    for guard in guards_schedule:
        if guard.time_asleep > most_sleepy_guard.time_asleep:
            most_sleepy_guard = guard

    print(int(most_sleepy_guard.id) * most_sleepy_guard.mode)


def resolve_second_puzzle(guards_schedule):
    guard_with_most_frequent_minute_asleep = guards_schedule[0]
    highest_occurrence_count = 0

    for guard in guards_schedule:
        counter = 0
        for minute in guard.minutes_asleep:
            if minute == guard.mode:
                counter += 1

        if counter > highest_occurrence_count:
            guard_with_most_frequent_minute_asleep = guard
            highest_occurrence_count = counter

    print(int(guard_with_most_frequent_minute_asleep.id) * guard_with_most_frequent_minute_asleep.mode)


raw_input = util.read_input_from_file("input-files/day-4.txt")
parsed_input = parse_input(raw_input)
guards_schedule = create_guards_schedule(parsed_input)
resolve_first_puzzle(guards_schedule)
resolve_second_puzzle(guards_schedule)
