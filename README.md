# Cohere-Hackathon

To run locally:

*Create the following files in parent director*
```
.gitignore
.env
```

*Inside .gitignore write the following*
```
.env
myvenv/
```

*Inside .env write the following*
```
API_KEY = 'your-api-key'
```

*To run frontend*
```
cd into my-react-app
npm install
npm run dev
```

*Then for the backend*
(new terminal)
```
cd into backend
python3 -m venv myvenv
source myvenv/bin/activate
pip3 install -r requirements.txt
```

*Then you run*
```
python3 app.py
```
