from onehot import build_user_vector
from cosine import cosine_similarity
from pymongo import MongoClient

def get_recommendations(user_id, media_dataset, top_n=10):
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017')
    db = client['your-db-name']
    user_pref = db['user_preferences'].find_one({'user_id': user_id})

    if not user_pref:
        return []

    user_vector = encode_user_preferences(user_pref)

    results = []
    for media_item in media_dataset:
        media_vector = media_item['vector']
        sim = cosine_similarity(user_vector, media_vector)
        results.append((media_item, sim))

    # Sort by similarity score
    results.sort(key=lambda x: x[1], reverse=True)

    return [item[0] for item in results[:top_n]]
