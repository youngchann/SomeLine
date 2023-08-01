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

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", "여행 좋아하는 남자"),
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
      room : "여행 좋아하는 남자"
    });

    setNewMessage("");
  };
  // 이모션이 작동하는 코드입니다.
  // 현재 해당 코드는 챗 지피티를 활용하여 만들어 졌으나, 비효율적입니다.
  const [hartClicked, hartIsClicked] = useState(false);
  const [sadClicked, sadIsClicked] = useState(false);
  const [angryClicked, angryIsClicked] = useState(false);
  const [key, setKey] = useState(Math.random());

  const hart_Click = () => {
    hartIsClicked(true);
    sadIsClicked(false);
    angryIsClicked(false);
    setKey(Math.random()); 
    setTimeout(() => hartIsClicked(false), 3000);
  };
  const sad_Click = () => {
    hartIsClicked(false);
    sadIsClicked(true);
    angryIsClicked(false);
    setKey(Math.random()); 
    setTimeout(() => sadIsClicked(false), 3000);
  };
  const angry_Click = () => {
    hartIsClicked(false);
    sadIsClicked(false);
    angryIsClicked(true);
    setKey(Math.random()); 
    setTimeout(() => angryIsClicked(false), 3000);
  };;
  //  챗지피티 이모션 활용끝


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
                <div className='chatbox_talk_box'><span className="user">{message.text}</span> </div>
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
        <div  className='chat_Profil_img'></div> 
        <h2 className='my_chat_Profil_name'>{auth.currentUser.displayName}</h2>
        {/* 해당 코드는 하트 이모션이 올라옵니다. */}
        <div key={key} className={`emt_hart ${hartClicked ? 'moveFadeOut' : ''}`}>💕</div>
        <div key={key} className={`emt_sad ${sadClicked ? 'moveFadeOut' : ''}`}>😢</div>
        <div key={key} className={`emt_angry ${angryClicked ? 'moveFadeOut' : ''}`}>👿</div>
        
        <div className='imotion_box'>

          <button className='imotion_btn_hart_btn' onClick={hart_Click}>💕좋아</button>
          <button className='imotion_btn_sad_btn' onClick={sad_Click}>😢슬퍼</button>
          <button className='imotion_btn_angry_btn' onClick={angry_Click}>👿화나</button>
        </div>
      </div>

    </div>
  )
}

export default React.memo(ChatBox);