from flask import Flask, render_template, request, jsonify
import google.generativeai as genai  # Update this to actual Gemini API
from langdetect import detect
from googletrans import Translator
import re
import os

app = Flask(__name__)

# Configure the Gemini API with your API key
genai.configure(api_key="AIzaSyAFzVK4fpeQgILVWHeWt2a08fpRfvFF0fI")  # Replace with your actual Gemini API key
translator = Translator()

# Define the model
# model = genai.GenerativeModel(model_name='gemini-pro')  # Assuming 'gemini-pro' is the model you want
model = genai.GenerativeModel("models/gemini-2.0-flash-thinking-exp-01-21")
#The model is updated

# Function to generate questions from text using Gemini
def generate_title_and_questions(text):
    title_response = model.generate_content(f"Generate a short title for the following content:\n\n{text}\n\nTitle:")
    title = title_response.text.replace("*", "").strip() if title_response.text else "Untitled"

    # Generate questions based on the provided content
    question_response = model.generate_content(f"Generate questions from the following text:\n\n{text}\n\nQuestions:")
    questions = question_response.text.replace("*", "").strip() if question_response.text else "No questions generated."

    return title, questions

@app.route('/users.html')
def users():
    return render_template('users.html')

@app.route('/adminLogin.html')
def adLogin():
    return render_template('adminLogin.html')

@app.route('/adminMain.html')
def adMain():
    return render_template('adminMain.html')

@app.route('/developers.html')
def dev():
    return render_template('developers.html')

@app.route('/editUser.html')
def editUser():
    return render_template('editUser.html')

@app.route('/generateReport.html')
def genRep():
    return render_template('generateReport.html')

@app.route('/managePDF.html')
def pdf():
    return render_template('managePDF.html')

@app.route('/manageUsers.html')
def muser():
    return render_template('manageUsers.html')

@app.route('/registration.html')
def registration():
    return render_template('registration.html')

@app.route('/loginmain.html')
def login():
    return render_template('loginmain.html')

@app.route('/')
def home():
    return render_template('homemain.html')

@app.route('/registration.html')
def reg():
    return render_template('registration.html')

@app.route('/homemain.html')
def homeMain():
    return render_template('homemain.html')

@app.route('/upload.html')
def upload():
    return render_template('upload.html')

@app.route('/download.html')
def download():
    return render_template('download.html')

@app.route('/question-paper.html')
def qp():
    return render_template('question-paper.html')

@app.route('/')
def AI():
    return render_template('generateAI.html')

@app.route('/generateAI.html')
def genAI():
    return render_template('generateAI.html')

@app.route('/generateAI')
def ai():
    return render_template('generateAI.html')

@app.route('/searchQs')
def searchQs():
    return render_template('searchQs.html')

@app.route('/searchQs.html')
def sQs():
    return render_template('searchQs.html')

@app.route('/generate', methods=['POST'])
def generate():
    user_text = request.form.get('user_text')

    # Calculate the number of words
    word_count = len(re.findall(r'\w+', user_text))
    min_word_limit = 5

    if word_count < min_word_limit:
        return jsonify({"error": f"Please enter at least {min_word_limit} words."})

    # Language detection and translation
    try:
        detected_language = detect(user_text)
        if detected_language != 'en':
            translated_text = translator.translate(user_text, src=detected_language, dest="en").text
        else:
            translated_text = user_text
    except Exception as e:
        return jsonify({"error": f"Error during language detection or translation: {str(e)}"})

     # Generate the title and questions using Gemini API
    title, questions = generate_title_and_questions(translated_text)

    # Translate questions back to the original language if needed
    if detected_language != 'en':
        try:
            title = translator.translate(title, src="en", dest=detected_language).text
            questions = translator.translate(questions, src="en", dest=detected_language).text
        except Exception as e:
            return jsonify({"error": f"Error during translation of questions: {str(e)}"})

    return jsonify({"title": title, "questions": questions})

if __name__ == '__main__':
    app.run(debug=False)

