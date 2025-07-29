import json
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.ensemble import RandomForestClassifier

# === 1. Carregar piadas ===
with open("jokes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# === 2. Preparar dados ===
jokes = []
labels = []

for joke in data["jokes"]:
    text = joke.get("text", "")
    answer = joke.get("answer", "")
    category = joke.get("category", None)

    if text and category:
        full_text = f"{text} {answer}".strip()
        jokes.append(full_text)
        labels.append(category)

# === 3. Gerar embeddings com SentenceTransformer ===
print(f"Treinando embeddings para {len(jokes)} piadas...")
encoder = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2') # converte texto em vetores
X = encoder.encode(jokes)

# === 4. Codificar rótulos (categorias) numericamente ===
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)

# === 5. Treinar classificador ===
clf = RandomForestClassifier(n_estimators=200, class_weight='balanced')
clf.fit(X, y)

# === 6. Salvar modelos ===
joblib.dump(clf, "joke_classifier.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
encoder.save("joke_encoder")

print("✅ Modelo treinado e salvo com sucesso.")

# uvicorn api:app --reload --host 127.0.0.1 --port 8000