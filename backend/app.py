from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
API_KEY = os.getenv("API_KEY")

data = {
    "vm": [
        {"id": 1, "name": "dkaapp-util" , "os": "Windows Server 2022", "platform": "onprem", "desc": "Iops util server"},
        {"id": 2, "name": "ieascs-001", "os": "Ubuntu 22.04", "platform": "aws", "desc": "Deployment master dev"},
        {"id": 3, "name": "ieascs-003", "os": "Ubuntu 22.04", "platform": "aws", "desc": "Deployment master prod"},
        {"id": 4, "name": "dkaapp-iopsdb", "os": "Ubuntu 22.04", "platform": "onprem", "desc": "DB server"},
        {"id": 5, "name": "vm-msj-tst-048", "os": "Ubuntu 22.04", "platform": "azure", "desc": "Deployment workflow test"}
    ],
    "subscription": [
        {"id": 1, "name": "sub-001-abcde-12345", "team": "Alpha Team", "app": "App1", "role": "Owner"},
        {"id": 2, "name": "sub-002-fghij-67890", "team": "Beta Team", "app": "App2", "role": "Contributor"},
        {"id": 3, "name": "sub-003-klmno-11223", "team": "Gamma Team", "app": "App3", "role": "Manager"},
        {"id": 4, "name": "sub-004-pqrst-44556", "team": "Delta Team", "app": "App4", "role": "Owner"},
        {"id": 5, "name": "sub-005-uvwxy-77889", "team": "Omega Team", "app": "App5", "role": "Owner"}
    ],
    "vnet": [
        {"id": 1, "name": "VNet1", "region": "East US", "cidr": "10.0.0.0/16", "subnet": "SubnetA", "status": "Active"},
        {"id": 2, "name": "VNet2", "region": "West US", "cidr": "10.1.0.0/16", "subnet": "SubnetB", "status": "Active"},
        {"id": 3, "name": "VNet3", "region": "Central US", "cidr": "10.2.0.0/16", "subnet": "SubnetC", "status": "Active"},
        {"id": 4, "name": "VNet4", "region": "North Europe", "cidr": "10.3.0.0/16", "subnet": "SubnetD", "status": "Inactive"},
        {"id": 5, "name": "VNet5", "region": "Southeast Asia", "cidr": "10.4.0.0/16", "subnet": "SubnetE", "status": "Active"}
    ],
    "product_team": [
        {"id": 1, "name": "Alpha Team", "lead": "Alice", "members": 10, "department": "Engineering", "status": "Active"},
        {"id": 2, "name": "Beta Team", "lead": "Bob", "members": 8, "department": "Marketing", "status": "Active"},
        {"id": 3, "name": "Gamma Team", "lead": "Charlie", "members": 6, "department": "Sales", "status": "Inactive"},
        {"id": 4, "name": "Delta Team", "lead": "David", "members": 12, "department": "Finance", "status": "Active"},
        {"id": 5, "name": "Omega Team", "lead": "Eve", "members": 15, "department": "HR", "status": "Active"}
    ]
}

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome!"

@app.route('/get-data', methods=['POST'])
def get_data():
        
    if request.headers.get('x-api-key'):
        key = request.headers.get('x-api-key')
    else:
        return jsonify({"error": "x-api-key is missing from header"}), 401


    if key != API_KEY:
        return jsonify({"error": "Unauthorized! API_KEY is missing or does not match."}), 401
    

    if request.json.get('kind'):
        kind = request.json.get('kind')
    else:
        return jsonify({"error": "'kind' parameter is required in request body."}), 400    
        

    result = data.get(kind.lower())
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "'kind' parameter value does not match with existing data."}), 400


if __name__ == '__main__':
    app.run(debug=True)