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


from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

# 1. Dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Treinar os modelos
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

# Modelo 1: Regressão Logística
lr = LogisticRegression(max_iter=1000, class_weight='balanced')
lr.fit(X_train, y_train)

# Modelo 2: Random Forest
rf = RandomForestClassifier(n_estimators=100, class_weight='balanced')
rf.fit(X_train, y_train)

# 3. Fazer previsões
y_pred_lr = lr.predict(X_test)
y_pred_rf = rf.predict(X_test)

# 4. Avaliar os modelos
print("=== Regressão Logística ===")
print(classification_report(y_test, y_pred_lr, target_names=label_encoder.classes_))
print("Acurácia:", accuracy_score(y_test, y_pred_lr))

print("\n=== Random Forest ===")
print(classification_report(y_test, y_pred_rf, target_names=label_encoder.classes_))
print("Acurácia:", accuracy_score(y_test, y_pred_rf))