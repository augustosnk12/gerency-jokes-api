# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json

app = FastAPI()

# === Carregar modelos ===
clf = joblib.load("joke_classifier.pkl")
label_encoder = joblib.load("label_encoder.pkl")
encoder = SentenceTransformer("joke_encoder")

# === Carregar dataset original (para vizinhança) ===
with open("jokes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

dataset_texts, dataset_labels = [], []
for joke in data["jokes"]:
    text = joke.get("text", "")
    answer = joke.get("answer", "")
    category = joke.get("category", None)
    if text and category:
        dataset_texts.append(f"{text} {answer or ''}".strip())
        dataset_labels.append(category)

# Pré-computar embeddings do dataset para busca rápida
dataset_embeddings = encoder.encode(dataset_texts, show_progress_bar=True)

# === Schemas ===
class JokeRequest(BaseModel):
    joke: str
    k: int | None = 3  # número de vizinhos (default = 3)


# === Endpoint simples ===
@app.post("/predict")
def predict_joke_category(request: JokeRequest):
    vector = encoder.encode([request.joke])
    predicted_index = clf.predict(vector)[0]
    category = label_encoder.inverse_transform([predicted_index])[0]
    return {"category": category}


# === Endpoint com vizinhos mais próximos ===
@app.post("/predict_with_neighbors")
def predict_with_neighbors(request: JokeRequest):
    vector = encoder.encode([request.joke])

    # Previsão normal
    predicted_index = clf.predict(vector)[0]
    category = label_encoder.inverse_transform([predicted_index])[0]

    # Similaridade com o dataset
    sims = cosine_similarity(vector, dataset_embeddings)[0]
    topk_idx = np.argsort(sims)[::-1][:request.k]

    neighbors = []
    for idx in topk_idx:
        neighbors.append({
            "text": dataset_texts[idx],
            "category": dataset_labels[idx],
            "similarity": float(sims[idx])
        })

    return {
        "predicted_category": category,
        "neighbors": neighbors
    }

# uvicorn api:app --reload --host 127.0.0.1 --port 8000