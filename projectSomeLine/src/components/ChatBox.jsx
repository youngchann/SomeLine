import React, { useState, useEffect, useRef, useCallback } from 'react';

const ChatBox = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if(chatEndRef.current){
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const chatContents = chat.map((message, index) => <p key={index}>{message}</p>);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (message) {
      setChat(oldChat => [...oldChat, message]);
      setMessage("");
    }
  }, [message]);

  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        {/* <img src="img/main_photo.jpeg" type='video/mp4' /> */}
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='you_chat_Profil'><div className='chat_Profil_img'></div><h2 className='you_chat_Profil_name'>Kim Daun</h2></div>
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
      <div className='my_chat_Profil'><div  className='chat_Profil_img'></div><h2 className='my_chat_Profil_name'>chanyong</h2></div>
    </div>
  )
}

export default React.memo(ChatBox);
