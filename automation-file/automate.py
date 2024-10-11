from flask import Flask, render_template, request, jsonify
from selenium import webdriver
import time

app = Flask(__name__)

# some of the naming is innconsistent with the form.html file
first_time_home_buyer = False
veteran_military = False
doctor = False
firefighter = False
law_enforcement = False
native_american = False
disability = False

@app.route('/')
def index():
    return render_template('form.html')  

@app.route('/submit', methods=['POST'])
def submit():
    global first_time_home_buyer, veteran_military, doctor, firefighter, law_enforcement, native_american, disability
    
    # Update global variables with form data
    first_time_home_buyer = request.form.get('firstTimeHomeBuyer') == 'true'
    veteran_military = request.form.get('veteranMilitary') == 'true'
    doctor = request.form.get('doctor') == 'true'
    firefighter = request.form.get('firefighter') == 'true'
    law_enforcement = request.form.get('lawEnforcement') == 'true'
    native_american = request.form.get('nativeAmerican') == 'true'
    disability = request.form.get('disability') == 'true'

    # prints for debugging
    print("First Time Home Buyer:", first_time_home_buyer)
    print("Veteran/Military:", veteran_military)
    print("Doctor:", doctor)
    print("Firefighter:", firefighter)
    print("Law Enforcement:", law_enforcement)
    print("Native American:", native_american)
    print("Disability:", disability)

    # selenium automated website interaction
    web = webdriver.Chrome() 
    web.get('https://downpaymentresource.com/are-you-eligible/')
    time.sleep(1)

    # interact with website using users form data
    if first_time_home_buyer:
        web.find_element('xpath', '//*[@id="additional"]/fieldset[3]/div/div[1]/label').click()  # law
    if veteran_military:
        web.find_element('xpath', '//*[@id="additional"]/fieldset[3]/div/div[2]/label').click()  # education
    if doctor:
        web.find_element('xpath', '//*[@id="additional"]/fieldset[3]/div/div[3]/label').click()  # firefighter
    if firefighter:
        web.find_element('xpath', '//*[@id="additional"]/fieldset[3]/div/div[4]/label').click()  # healthcare

    time.sleep(500) # time before it submits the form
    return jsonify({"message": "Data received and website automated successfully"})


if __name__ == '__main__':
    app.run(debug=True)

