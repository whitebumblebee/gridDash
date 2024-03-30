import os
import time

frames = [
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n",

    "+---+---+---+\n"
    "| X |   |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n",

    "+---+---+---+\n"
    "| X | X |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n"
    "|   |   |   |\n"
    "+---+---+---+\n"
]

while True:
    for frame in frames:
        os.system('cls' if os.name == 'nt' else 'clear')  # Clear the screen
        print(frame)
        time.sleep(0.5)  # Delay for 0.5 seconds

