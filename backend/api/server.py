from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})


# 가상의 머신러닝 모델 함수 (단순한 예시입니다)
def run_machine_learning(data):
    # 여기에 실제 머신러닝 모델을 실행하는 코드를 추가합니다
    # return prediction
    return f"ok: {data[0]}!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print(request.json)  # Debug print
        data = request.json['data']
        print(f"Received data from React: {data}")
        prediction = run_machine_learning(data)
        print(f"Prediction: {prediction}")  # Debug print
        return jsonify({'prediction': 'nice'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
