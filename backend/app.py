from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Mock data for simplicity (could come from a database)
menu_items = [
    {"title": "Pizza", "class": "Italian"},
    {"title": "Pasta", "class": "Italian"},
    {"title": "Sushi", "class": "Japanese"},
    {"title": "Ramen", "class": "Japanese"},
    {"title": "Burger", "class": "Fast Food"},
    {"title": "Tacos", "class": "Mexican"},
    {"title": "Salad", "class": "Healthy"},
]

# Dummy dataset to calculate similarities
user_order_history = pd.DataFrame({
    "userId": [1, 1, 1, 2, 2, 3],
    "title": ["Pizza", "Pasta", "Burger", "Sushi", "Ramen", "Pizza"],
})

# Recommendation function using collaborative filtering
def get_recommendations(user_orders):
    all_orders = user_order_history.append(user_orders, ignore_index=True)
    
    # One-hot encoding to vectorize items
    order_matrix = pd.get_dummies(all_orders['title'])
    
    # Calculate cosine similarity
    user_sim = cosine_similarity(order_matrix)
    
    # Sum the similarities and recommend the most similar food items
    recommendation_scores = user_sim.sum(axis=1)
    top_indices = recommendation_scores.argsort()[-3:][::-1]  # Get top 3
    
    recommendations = all_orders.iloc[top_indices].title.unique().tolist()
    return recommendations

@app.route("/recommend", methods=["POST"])
def recommend():
    user_data = request.json.get("orderData", [])
    
    # Convert user's order history to DataFrame
    if len(user_data) == 0:
        return jsonify({"message": "No order data provided."}), 400

    user_orders = pd.DataFrame(user_data)
    
    # Get recommendations
    recommendations = get_recommendations(user_orders)
    
    if not recommendations:
        return jsonify({"message": "No recommendations found."}), 404
    
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(port=5000, debug=True)

