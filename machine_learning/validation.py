import joblib
from sentence_transformers import SentenceTransformer

# === 1. Carregar modelos salvos ===
clf = joblib.load("joke_classifier.pkl")
label_encoder = joblib.load("label_encoder.pkl")
encoder = SentenceTransformer("joke_encoder")

# === 2. Novas piadas para testar ===
novas_piadas = [
    "Por que o cachorro levou óculos escuros para a praia? Para não ser reconhecido.",
    "O que o computador disse para o programador? Pare de mexer no meu código!",
    "No rodízio, ele pergunta se pode pagar por peso ou por amor.",
    "Veja pelo lado bom: você ganhou um doença com o próprio nome", 
    "Ela não sabe nem trocar uma lâmpada",
    "por que minha internet não funciona no elevador? Porque é internet de escada",
    "Sabe o que cairia bem agora? A temperatura",
    "Ele quer beijar um porco",
    "Isso é um trocadilho ou troca de ilha?",
    "Por que a plantinha não faz piadas? Tem medo do desmatamento!"
]

# === 3. Gerar embeddings ===
X_novas = encoder.encode(novas_piadas, show_progress_bar=False)

# === 4. Fazer previsões ===
predicoes = clf.predict(X_novas)

# === 5. Decodificar para nomes de categorias ===
categorias_previstas = label_encoder.inverse_transform(predicoes)

# === 6. Mostrar resultados ===
for piada, categoria in zip(novas_piadas, categorias_previstas):
    print(f"Piada: {piada}")
    print(f"Categoria prevista: {categoria}\n")
