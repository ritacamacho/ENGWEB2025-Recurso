import json

def normalize_cocktail(cocktail_data):
    cleaned = {
        "_id": cocktail_data["id"],
        "nome": cocktail_data.get("nome", ""),
        "foto": cocktail_data.get("foto", None),
        "categoria": cocktail_data.get("categoria", None),
        "servidoEm": cocktail_data.get("servidoEm", None),
        "preparacao": cocktail_data.get("preparacao", ""),
        "ingredientes": cocktail_data.get("ingredientes", []),
        "criador": None
    }

    if "criador" in cocktail_data:
        cleaned["criador"] = {
            "id": cocktail_data["criador"].get("id"),
            "nome": cocktail_data["criador"].get("nome")
        }

    return cleaned

def main():
    with open("original_dataset.json", "r", encoding="utf-8") as f:
        original_data = json.load(f)

    cleaned_data = [normalize_cocktail(entry) for entry in original_data]

    with open("dataset.json", "w", encoding="utf-8") as f:
        json.dump(cleaned_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()