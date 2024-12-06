import random
chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!£%^&*(`)"

while 1:
    passwordlen = int(input("What length would you like your password to be?: "))
    passwordcount = int(input("How many passwords would you like?: "))
    for x in range (0,passwordcount):
        password = ""
        for x in range(0,passwordlen):
            passwordchar = random.choice(chars)
            password = password + passwordchar
        print("Here is your password: ", password)