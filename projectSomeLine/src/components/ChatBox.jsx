import React, { useState, useEffect} from 'react';

import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const ChatBox = ({room}) => {
  // const [chat, setChat] = useState([]);
  // const [message, setMessage] = useState("");
  // const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room : "치킨 왕자 && 감자 공주"
    });

    setNewMessage("");
  };

  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        {/* <img src="img/main_photo.jpeg" type='video/mp4' /> */}
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='you_chat_Profil'><div className='chat_Profil_img'></div><h2 className='you_chat_Profil_name'>상대방</h2></div>
      <div className='chatbox_box'>
        <div className='messages'>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.user === auth.currentUser.displayName ? "my-message" : "other-message"}`}>
                <span className="user">{message.text}</span> 
            </div>
          ))}
        </div>
        <form className='chatbox_input' onSubmit={handleSubmit}>
          <input 
            className='chat_input_text' 
            type="text" 
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button 
            className="chat_send_btn" 
            type="submit"
          >
            보내기
          </button>
        </form>
      </div>
      <div className='my_chat_Profil'>
        <div  className='chat_Profil_img'>
      </div><h2 className='my_chat_Profil_name'>{auth.currentUser.displayName}</h2></div>
    </div>
  )
}

export default React.memo(ChatBox);
