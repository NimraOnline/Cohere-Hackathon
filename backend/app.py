from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

cors = CORS(app, resources={r"/submit": {"origins": "http://localhost:5173/*"}})


API_KEY = os.getenv("API_KEY")

def call_model(prompt):
    co = cohere.Client(API_KEY) 
    response = co.generate(
    model='command',
    prompt=prompt,
    max_tokens=200,
    temperature=0.6,
    k=0,
    stop_sequences=[],
    return_likelihoods='NONE')
    return response.generations[0].text

@app.route('/submit', methods=['POST'])
def submit():
    print("inside")
    if request.method == 'POST':
        data = request.get_json()
        emotion = data.get('emotion')
        objective = data.get('objective')

        # Do something with the received data
        # For now, just printing it
        print(f'Emotion: {emotion}')
        print(f'Objective: {objective}')
        
        prompt = f'Find relevant quran verses for the following objective: {objective} '
        if emotion != '':
            prompt += f'that would be helpful to someone who is {emotion}.'
        print(prompt)
        response = call_model(prompt)
        return jsonify({'generated': response})

if __name__ == '__main__':
    app.run(debug=True)
