from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import uuid

db = firestore.client()
user_Ref = db.collection('user')

userAPI = Blueprint('userAPI', __name__)


@userAPI.route('/chatRoomName', methods=['POST'])
def roomName():
    try:
        data = request.json
        room_data = data.get('data')
        print(room_data)
        return jsonify(request), 200
    except Exception as e:
        return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500


@userAPI.route('/get_chatbot_messages', methods=['GET'])
def get_chatbot_messages():
    try:
        chatbot_messages_query = (
            db.collection('messages')
        .where('room', '==', '챗봇')
        .stream()
        )

        chatbot_messages = []
        for message in chatbot_messages_query:
            chatbot_messages.append(message.to_dict())
        print(chatbot_messages)
        return jsonify("chatbot_messages"), 200
    except Exception as e :
       return jsonify({"error": f"An Error Occurred: {str(e)}"}), 500