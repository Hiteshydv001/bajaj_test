from flask import Flask, request, jsonify
import re

app = Flask(__name__)

@app.route("/bfhl", methods=["POST"])
def process_data():
    try:
        data = request.get_json()
        if "data" not in data or not isinstance(data["data"], list):
            return jsonify({"is_success": False, "error": "Invalid input format"}), 400
        
        user_id = "hitesh_kumar_21022025"  # Format: full_name_ddmmyyyy
        email = "hitesh@xyz.com"
        roll_number = "ABCD123"
        
        numbers = [item for item in data["data"] if item.isdigit()]
        alphabets = [item for item in data["data"] if re.match(r'^[a-zA-Z]$', item)]
        highest_alphabet = [max(alphabets, key=str.lower)] if alphabets else []
        
        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 500

@app.route("/bfhl", methods=["GET"])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

if __name__ == "__main__":
    app.run(debug=True)
