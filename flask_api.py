# PYTHON FLASK SERVER THAT RUNS BERT MODEL

from flask import Flask, request, jsonify
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification
import logging # for debugging

app = Flask(__name__)

# Load pre-trained BERT model and tokenizer from Hugging Face
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased')


# Function to get BERT embeddings
def get_bert_embeddings(text):
    inputs = tokenizer(text, return_tensors="tf", padding=True, truncation=True)
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state  # Get the last hidden state (embeddings)
    return embeddings.numpy().tolist()

@app.route('/get_movie_embeddings', methods=['POST'])
def get_movie_embeddings():
    data = request.json
    print("Received data:", data)  # Log the input
    movie_titles = data['titles']
    
    embeddings = []
    for title in movie_titles:
        emb = get_bert_embeddings(title)
        embeddings.append({
            'title': title,
            'embedding': emb[0]  # Extracting the embeddings for the first token
        })
    
    return jsonify(embeddings)

if __name__ == '__main__':
    app.run(debug=True, port=5000)