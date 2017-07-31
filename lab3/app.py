import os
from flask import Flask, jsonify, request, json, render_template, send_from_directory
from flask_cors import CORS, cross_origin
from flask_api import status

app = Flask(__name__)


@app.route('/myservice/list', methods=['GET'])
def create_project_call():
    CORS(app)

    products = ["water", "cookies", "french fries", "milk", "pasta"]

    return json.dumps(products), status.HTTP_200_OK



port = 8080

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
