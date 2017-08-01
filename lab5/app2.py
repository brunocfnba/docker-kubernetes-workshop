import os
from flask import Flask, jsonify, request, json, render_template, send_from_directory
from flask_cors import CORS, cross_origin
from flask_api import status

app = Flask(__name__)


@app.route('/myservice/list', methods=['GET'])
def create_project_call():
    CORS(app)

    products = {"products": [{"name": "water", "price": 2.30},
                {"name": "cookies", "price": 3.40}, {"name": "french fries", "price": 6.00},
                {"name": "milk", "price": 4.30},]}

    return json.dumps(products), status.HTTP_200_OK



port = 8080

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
