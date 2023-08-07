from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

@app.route('/get_chatbot_messages', methods=['POST'])
def get_chatbot_messages():
    try:
        # 클라이언트로부터 JSON 데이터 수신
        data = request.json
        room_data = data.get('data')

        # 수신된 데이터를 처리하고 응답을 반환
        response_data = {"message": f"Received data for room: {room_data}"}
        print(response_data)
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)