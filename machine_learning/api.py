# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from sentence_transformers import SentenceTransformer

app = FastAPI()

# Carregar modelos
clf = joblib.load("joke_classifier.pkl")
label_encoder = joblib.load("label_encoder.pkl")
encoder = SentenceTransformer("joke_encoder")

class JokeRequest(BaseModel):
    joke: str

@app.post("/predict")
def predict_joke_category(request: JokeRequest):
    vector = encoder.encode([request.joke])
    predicted_index = clf.predict(vector)[0]
    category = label_encoder.inverse_transform([predicted_index])[0]
    return {"category": category}
