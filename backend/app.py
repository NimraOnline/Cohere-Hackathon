from flask import Flask, request, jsonify, g
from flask_cors import CORS, cross_origin
import requests
import weaviate
from langchain.chains.summarize import load_summarize_chain
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatCohere
import cohere
from dotenv import load_dotenv
import os
import re


# Set the path to your .env file
env_path = os.path.join('.env')
load_dotenv(dotenv_path=env_path)
load_dotenv(dotenv_path=env_path)

API_KEY = os.getenv("API_KEY")
WEAVIATE_KEY = os.getenv("WEAVIATE_KEY")
WEAVIATE_URL = os.getenv("WEAVIATE_URL")

app = Flask(__name__)
app.config["CORS_HEADERS"]='Content-Type'
cors = CORS(app, resources={r"*": {"origins": "*"}})

def create_weaviate_client():
    if not hasattr(g, 'weaviate_client'):
        auth_config = weaviate.auth.AuthApiKey(api_key=WEAVIATE_KEY)
        client = weaviate.Client(
            url=WEAVIATE_URL,
            auth_client_secret=auth_config,
            additional_headers={
                "X-Cohere-Api-Key": API_KEY
            }
        )
        if not client.is_ready():
            raise RuntimeError("Weaviate client failed to connect.")
        
    return client

def hybrid_search(query):
    for attempt in range(2):
        try:
            client = create_weaviate_client()
            response = (
                client.query
                .get("Quran", ["tafsir", "sura", "aya"])
                .with_hybrid(
                    query=query,
                    alpha=0.75
                )
                .with_limit(3)
                .do()
            )
            return response['data']['Get']['Quran']
        except Exception as e:
            print(f"Attempt {attempt + 1} failed with error: {e}")
            # You can add more specific exception types if needed
            # to catch only network-related errors, for example.
            # Example: except requests.exceptions.RequestException as e:
    
    # If all attempts fail, you might want to handle it accordingly
    print("2 attempts failed. Returning None.")
    return None

def call_model(message, context):
    llm = ChatCohere(cohere_api_key=API_KEY)
    chain_type = "map_reduce"
    chain = load_summarize_chain(llm, chain_type=chain_type, verbose=False)

    prompt = ChatPromptTemplate.from_template("""
    A user searches "{message}" and the following result comes up: {context}

    Your job is to summarize this result in relation to the user's search into ONE sentence.
    Very briefly include how their search relates to the results in ONE SENTENCE.

    Only respond with the sentence and nothing else. Do not ask any follow up questions!
    """)


    chain = prompt | llm

    result = chain.batch([{"message": message, "context": context[0]['tafsir']}, 
                          {"message": message, "context":context[1]['tafsir']}, 
                          {"message": message, "context":context[2]['tafsir']}])

    return result

def remove_newlines_and_questions(text):
    # Remove everything after the first newline character
    text = re.sub(r'\.(.*?\?)', ".", text)
    text = re.sub(r'\n(.*?\?)', "", text)
    text = re.sub(r"Muhammad", "Muhammad (ﷺ)", text)

    # Remove any spaces at the beginning or end of the string
    text = text.strip()
    
    return text

#Function to retrieve associated verses
def get_verses(quran_data):
    returned_verses = [None, None, None]
    i = 0
    for verse_tuple in quran_data:
        surah, ayas, tafsir_docs = verse_tuple
        aya_list = [int(x) for x in ayas.split(',')]
        eng_verse_chunk = ""
        arb_verse_chunk = ""
        for aya in aya_list:
            api_url = f"https://quranenc.com/api/v1/translation/aya/english_saheeh/{surah}/{aya}"
            response = requests.get(api_url)
            data = response.json()
            eng = data['result']['translation']
            arb = data['result']['arabic_text']
            # footnote = data['result']['footnotes']
            # print(arb)
            # print(eng)
            # print(f"({surah}:{aya})")
            eng_verse_chunk+=eng
            arb_verse_chunk+=arb + f"({aya})"
        returned_verses[i] = {"English": eng_verse_chunk,
                                "Arabic": arb_verse_chunk,
                                "Citation": f"({surah}:{ayas})",
                                "Docs": tafsir_docs}
        i+=1

    return(returned_verses)

def generateQuestions(doc, verse):
    co = cohere.Client(API_KEY)
    generate_prompt = f"""
    Tadabbur refers to the act of contemplation, reflection, or thoughtful consideration. 
    It is often associated with reflecting on the meanings of Quranic verses or contemplating the natural world as a means of deepening one's understanding and connection with God. 
    Tadabbur involves pondering the deeper meanings and implications of various aspects of life.

    Using this definition, generate 3 deep and descriptive questions to assist one in doing tadabbur for the folloing text and verse: {doc} and {verse}.
    """
    response = co.generate(
    model='command',
    prompt=generate_prompt,
    max_tokens=500,
    temperature=1.0,
    k=0,
    stop_sequences=[],
    return_likelihoods='NONE')

    return(response.generations[0].text)

@app.route('/submit', methods=['POST'])
def submit():
    print("inside submit")
    if request.method == 'POST':
        data = request.get_json()
        emotion = data.get('emotion')
        objective = data.get('objective')

        if emotion!="":
            query = f"{objective} for people who are {emotion}"
        else:
            query = f"{objective}"

        print(f'Query: {query}')

        documents = hybrid_search(query)

        if documents == None:
            return jsonify(error="An error occurred", message="Weaviate Search Failed"), 500

        result = call_model(query, documents)

        summaries = []
        for ai in result:
            cleaned = remove_newlines_and_questions(ai.content)
            summaries.append(cleaned)

        quran_data = []
        quran_data.append((documents[0]['sura'], documents[0]['aya'], documents[0]['tafsir']))
        quran_data.append((documents[1]['sura'], documents[1]['aya'], documents[1]['tafsir']))
        quran_data.append((documents[2]['sura'], documents[2]['aya'], documents[2]['tafsir']))

        verses = get_verses(quran_data)
        
        return jsonify({'generated': summaries,
                        'metadata' : verses})

@app.route('/reflect', methods=['POST'])
def reflect():
    print("inside reflect")
    if request.method == 'POST':
        data = request.get_json()
    tafsir = data.get('Docs')
    english = data.get('English')

    questions = generateQuestions(tafsir, english)

    return jsonify({'questions': questions})

if __name__ == '__main__':
    app.run(debug=False)