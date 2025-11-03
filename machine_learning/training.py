import json
import joblib
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.linear_model import LogisticRegression

# === 1. Configuração ===
EMBEDDING_MODEL = "neuralmind/bert-base-portuguese-cased"

# === 2. Carregar dataset ===
with open("jokes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts, labels = [], []
for joke in data["jokes"]:
    text = joke.get("text", "")
    answer = joke.get("answer", "")
    category = joke.get("category", None)
    if text and category:
        texts.append(f"{text} {answer or ''}".strip())
        labels.append(category)

print(f"Total de piadas: {len(texts)}")

# === 3. Codificar rótulos ===
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(labels)

# === 4. Dividir dataset ===
# Primeiro: treino + temp (validação+teste)
X_train_texts, X_temp_texts, y_train, y_temp = train_test_split(
    texts, y, test_size=0.2, random_state=42, stratify=y
)
# Depois: dividir temp igualmente em validação e teste
X_val_texts, X_test_texts, y_val, y_test = train_test_split(
    X_temp_texts, y_temp, test_size=0.5, random_state=42, stratify=y_temp
)

print(f"Treino: {len(X_train_texts)} | Validação: {len(X_val_texts)} | Teste: {len(X_test_texts)}")

# === 5. Gerar embeddings ===
print("\nGerando embeddings...")
encoder = SentenceTransformer(EMBEDDING_MODEL)

X_train = encoder.encode(X_train_texts, show_progress_bar=True)
X_val = encoder.encode(X_val_texts, show_progress_bar=True)
X_test = encoder.encode(X_test_texts, show_progress_bar=True)

# === 6. Treinar classificador ===
clf = LogisticRegression(max_iter=2000, class_weight="balanced", random_state=42)
clf.fit(X_train, y_train)

# === 7. Avaliação ===
print("\n=== Métricas (Validação) ===")
y_val_pred = clf.predict(X_val)
print(classification_report(y_val, y_val_pred, target_names=label_encoder.classes_))

print("\n=== Métricas (Teste) ===")
y_test_pred = clf.predict(X_test)
print(classification_report(y_test, y_test_pred, target_names=label_encoder.classes_))

# === 8. Salvar modelo ===
joblib.dump(clf, "joke_classifier.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
encoder.save("joke_encoder")

print("\n✅ Modelo treinado e salvo com sucesso.")
