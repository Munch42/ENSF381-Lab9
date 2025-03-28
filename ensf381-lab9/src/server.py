from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Assigning multiple routes to the same function
@app.route('/',methods=['POST'])
@app.route('/main',methods=['POST'])
def home():
  data = request.get_json() # Retrieves the JSON data from the incoming request and store it in a dictionary
  print(data['username']) # Accesses the 'username' field from the data dictionary

  print('This is the home API')

  #return 'Welcome to the home page!'
  #return 'Welcome {} to the home page!'.format(data['username'])
  msg = 'Welcome {} to the home page!'.format(data['username'])
  return {'msg':msg}

@app.route('/about')
def about():
  return 'Welcome to the About Us page!'

if __name__ == '__main__':
  app.run(debug=True)