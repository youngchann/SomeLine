import re
from konlpy.tag import Okt
import nltk
from nltk.corpus import stopwords
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# 라벨 인코딩을 위한 객체 생성
label_encoder = joblib.load('label_encoder.joblib')

# 텍스트 전처리를 위한 함수 정의
def preprocess_text(text):
    # 특수 문자 제거
    text = re.sub(r"[^a-zA-Z0-9가-힣\s]", "", text)
    # 토큰화 (형태소 분석)
    okt = Okt()
    tokens = okt.morphs(text, stem=True)
    # 불용어 제거
    stop_words = set(stopwords.words('english'))  # 영어 불용어 리스트
    tokens = [word for word in tokens if word not in stop_words] # 불용어 제거 코드
    return " ".join(tokens)


def predict_response(input_text):
    # 모델 로드
    tfidfVec = joblib.load('tfidfVec.joblib')
    logi_model = joblib.load('logi_model.joblib')
    
    # 입력 대화 전처리
    preprocessed_input = preprocess_text(input_text)
    # TF-IDF 벡터화
    tfidf_input = tfidfVec.transform([preprocessed_input])
    # 키워드 예측
    prediction = logi_model.predict(tfidf_input)
    # 인덱스를 키워드로 변환
    predicted_keyword = label_encoder.inverse_transform(prediction)[0]
    return predicted_keyword


@app.route('/get_chatbot_messages', methods=['POST'])
def get_chatbot_messages():
    try:
        # 클라이언트로부터 JSON 데이터 수신
        data = request.json
        messages_data = data.get('data')

        # 수신된 데이터를 처리하고 응답을 반환
        response_data = {"message": f"Received data for room: {''.join(messages_data)}"}
        print(predict_response(''.join(messages_data)))
        print(response_data)
        return jsonify(predict_response(''.join(messages_data))), 200

    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500
    
@app.route('/chatbot_message', methods=['POST'])
def chatbot_message():
    try:
        # 클라이언트로부터 JSON 데이터 수신
        data = request.json
        message_data = data.get('data')

        # 수신된 데이터를 처리하고 응답을 반환
        response_data = {"message": f"Received data for room: {''.join(message_data)}"}
        print(predict_response(''.join(message_data)))
        print(response_data)
        return jsonify(predict_response(''.join(message_data))), 200

    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500
    

# @app.route('/emoji', methods=['POST'])
# def emoji():
#     try:
#         # 클라이언트로부터 JSON 데이터 수신
#         data = request.json
#         emoji_data = data.get('data')

#         # 수신된 데이터를 처리하고 응답을 반환
#         response_data = {"message": f"Received data for room: {emoji_data}"}
#         print(response_data)
#         return jsonify(predict_response(emoji_data)), 200

#     except Exception as e:
#         return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500



if __name__ == '__main__':
    app.run(debug=True)