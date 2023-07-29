import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client";
import SideMenu from "./SideMenu";

const ENDPOINT = "http://localhost:3004/chatbox"; 

const ChatBox = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const chatEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);

    socketRef.current.on("FromAPI", data => {
      if(data !== message) {
        setChat(oldChat => [...oldChat, data]);
      }
    });

    return () => socketRef.current.disconnect();
  }, [message]);

  useEffect(() => {
    if(chatEndRef.current){
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const chatContents = chat.map((message, index) => <p key={index}>{message}</p>);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      setChat(oldChat => [...oldChat, message]);
      socketRef.current.emit("chat message", message);
      setMessage("");
      // Ensure the chat box scrolls down to show the new message
      setTimeout(() => {
        if(chatEndRef.current){
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  };

  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        {/* <img src="img/main_photo.jpeg" type='video/mp4' /> */}
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
        </div>
      <div className='chatbox_box'>
        <div className='chatbox_contents'>
          <p>접속되었습니다. -- 대화를 시작합니다.</p>
          {chatContents}
          <div ref={chatEndRef}></div> {/* A reference to the end of chat */}
        </div>
        <form className='chatbox_input' onSubmit={sendMessage}>
          <input 
            className='chat_input_text' 
            type="text" 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
          />
          <button 
            className="chat_send_btn" 
            type="submit"
          >
            보내기
          </button>
        </form>
      </div>
      <div className='chatbox_side_box'>
        <SideMenu/>
        <div className='you_chat_Profil'><div className='chat_Profil_img'></div><h2 className='you_chat_Profil_name'>Kim Daun</h2></div>
      </div>
    </div>
  )
}

export default ChatBox;
