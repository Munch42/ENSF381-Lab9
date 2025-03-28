from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Assigning multiple routes to the same function
@app.route('/predict_house_price',methods=['POST'])
def predict_house_price():
  model = joblib.load("./src/random_forest_model.pkl")
  data = request.json

  cats = True if 'pets' in data and data['pets'] else False
  dogs = True if 'pets' in data and data['pets'] else False

  sample_data = [
    data['city'],
    data['province'],
    float(data['latitude']),
    float(data['longitude']),
    data['lease_term'],
    data['type'],
    float(data['beds']),
    float(data['baths']),
    float(data['sq_feet']),
    data['furnishing'],
    data['smoking'],
    cats,
    dogs
  ]

  sample_df = pd.DataFrame([sample_data], columns=[
    'city', 'province', 'latitude', 'longitude', 'lease_term',
    'type', 'beds', 'baths', 'sq_feet', 'furnishing',
    'smoking', 'cats', 'dogs'
  ])

  predicted_price = model.predict(sample_df)

  return jsonify({"predicted_price": float(predicted_price[0])})

@app.route('/about')
def about():
  return 'Welcome to the About Us page!'

if __name__ == '__main__':
  app.run(debug=True)