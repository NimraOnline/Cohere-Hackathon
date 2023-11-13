from flask import Flask, request, jsonify
import cohere
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

API_KEY = os.getenv("API_KEY")
co = cohere.Client(API_KEY) 


@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        data = request.get_json()
        emotion = data.get('emotion')
        objective = data.get('objective')

        # Do something with the received data
        # For now, just printing it
        print(f'Emotion: {emotion}')
        print(f'Objective: {objective}')

        # You can perform further processing here based on your application's needs

        # Sending a simple response back to the frontend
        return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)
