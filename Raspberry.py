import RPi.GPIO as GPIO
#from gpiozero import GPIO
import time

def open_close_door():
    # Set GPIO numbering mode
    GPIO.setmode(GPIO.BOARD)

    # Set pin 11 as an output, and set servo1 as pin 11 as PWM
    GPIO.setup(11, GPIO.OUT)
    servo1 = GPIO.PWM(11, 50)  # Note 11 is pin, 50 = 50Hz pulse

    # Start PWM running, but with value of 0 (pulse off)
    servo1.start(0)
    time.sleep(2)

    # Rotate 90 degrees
    print("Rotating 90 degrees")
    servo1.ChangeDutyCycle(7)  # Adjust duty cycle for 90 degrees
    time.sleep(1) 

    # Wait for 3 seconds
    time.sleep(3)

    # Turn back to 0 degrees
    print("Turning back to 0 degrees")
    servo1.ChangeDutyCycle(2)
    time.sleep(1)
    servo1.ChangeDutyCycle(0) #Ensure that the servo motor returns to its starting position

    # Clean things up at the end
    servo1.stop()
    GPIO.cleanup()

# Call the function to open and close the door
open_close_door()
