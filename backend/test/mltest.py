import re
from konlpy.tag import Okt
import nltk
from nltk.corpus import stopwords
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from joblib import load

app = Flask(__name__)
# CORS(app, origins="http://localhost:3000")
CORS(app)

# 라벨 인코딩을 위한 객체 생성
# label_encoder = joblib.load('label_encoder.joblib')
label_encoder = load('best_logistic_label_encoder.pkl')

openai.api_key = "api키 입력"


# # 텍스트 전처리를 위한 함수 정의
# def preprocess_text(text):
#     # 특수 문자 제거
#     text = re.sub(r"[^a-zA-Z0-9가-힣\s]", "", text)
#     # 토큰화 (형태소 분석)
#     okt = Okt()
#     tokens = okt.morphs(text, stem=True)
#     # 불용어 제거
#     stop_words = set(stopwords.words('english'))  # 영어 불용어 리스트
#     tokens = [word for word in tokens if word not in stop_words] # 불용어 제거 코드
#     return " ".join(tokens)


# def predict_response(input_text):
#     # 모델 로드
#     tfidfVec = joblib.load('tfidfVec.joblib')
#     logi_model = joblib.load('logi_model.joblib')
    
#     # 입력 대화 전처리
#     preprocessed_input = preprocess_text(input_text)
#     # TF-IDF 벡터화
#     tfidf_input = tfidfVec.transform([preprocessed_input])
#     # 키워드 예측
#     prediction = logi_model.predict(tfidf_input)
#     # 인덱스를 키워드로 변환
#     predicted_keyword = label_encoder.inverse_transform(prediction)[0]
#     return predicted_keyword

def preprocess_text(text):
    # 특수 문자 제거
    text = re.sub(r"[^a-zA-Z가-힣\s]", "", text)
    # 토큰화 (형태소 분석)
    okt = Okt()
    tokens = okt.morphs(text, stem=True)
    # 불용어 처리를 위한 한국어 불용어 리스트
    custom_stop_words = ["그거", "그것", "그건", "저번", "저거", "오늘", "이번", "난", "내일", "이거", 
                         "이것", "이건", "키키", "야", "니", "너", "진짜", "안녕", "소속", "무엇", "네",
                         "저희", "저", "예", "저기", "그건", "그거", "이게", "뭔", "우선", "친절",
                         "감사", "행복", "하루", "잠깐", "이거", "제", "그게", "죄송", "안녕", "연락",
                         "제가", "저번", "수고", "이요", "연락", "하루", "기타", "개", "이거", "이것",
                         "이건"]
    # 불용어 제거
    tokens = [word for word in tokens if word not in custom_stop_words]
    return " ".join(tokens)

def predict_response(input_text):
    # 모델 로드
    tfidfVec = load('best_logistic_tfidf_vectorizer.pkl')
    logi_model = load('best_logistic_regression_TFIDF.pkl')
    
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
        newMessage_data = data.get('newData')
        name = data.get('name')


        # 수신된 데이터를 처리하고 응답을 반환
        messages = [{
          "role": "system",
          "content": f"you are korean,Do not use honorifics and do not use profanity, my name is {name}."
        }]
        for i in range(len(message_data)):
            content = message_data[i]
            if i % 2 == 0:
                messages.append({"role":"user", "content":content})
            else:
                messages.append({"role":"assistant", "content":content})
        messages.append({"role":"user", "content":newMessage_data})
        print(newMessage_data)
        print(messages)

        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )

        chat_response = response.choices[0].message.content
        print("--------------------------")
        chat_response = chat_response.strip("\"\\")
        chat_response = chat_response.replace('\n',' ')
        print(chat_response)
        return jsonify(chat_response), 200
    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500
    

@app.route('/emoji', methods=['POST'])
def emoji():
    try:
        # 클라이언트로부터 JSON 데이터 수신
        data = request.json
        emoji_data = data.get('data')

        # 수신된 데이터를 처리하고 응답을 반환
        response_data = {"message": f"Received data for room: {emoji_data}"}
        print(response_data)
        return jsonify(emoji_data), 200

    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500
    



if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = '5000', debug=True)
