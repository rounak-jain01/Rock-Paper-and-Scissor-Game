import random

a = random.randint(1, 3)

print("Welcome to the Ultimate Rock, Paper, and Scissor Game!")
print("Get ready to test your luck and skill against the computer. Let's see who wins!\n")

name = input("Enter Your Name: ")
print(f"\nGreat to meet you, {name}! Let the game begin!\n")

print("Choose any one of the following options:")
print("1 -> Rock \n2 -> Paper \n3 -> Scissor")
i = int(input("\nEnter Your Choice (1/2/3): "))

if i == 1:
    print(f"{name} chose Rock!\n")
elif i == 2:
    print(f"{name} chose Paper!\n")
elif i == 3:
    print(f"{name} chose Scissor!\n")
else:
    print("Invalid Input! Please restart the game and choose between 1, 2, or 3.\n")
    exit()

if a == 1:
    print("Computer chose Rock!\n")
elif a == 2:
    print("Computer chose Paper!\n")
elif a == 3:
    print("Computer chose Scissor!\n")

if a == i:
    print("It's a Tie! Both of you are equally awesome!\n")
elif (i == 1 and a == 3) or (i == 2 and a == 1) or (i == 3 and a == 2):
    print(f"Congratulations {name}! You are the WINNER!\n")
else:
    print(f"The Computer WON! Better luck next time, {name}!\n")

