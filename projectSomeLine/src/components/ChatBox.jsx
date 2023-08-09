import React, { useState, useEffect, useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { Link } from 'react-router-dom';
import axios from 'axios'



const ChatBox = ({room}) => {

  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [user, setUser] = useState(null);
  const [selectedUserName, setSelectedUser] = useState(sessionStorage.getItem('selectedUserName' || ''))
  const [selectedProfileUrl, setSelectedProfileUrl] = useState(sessionStorage.getItem('selectedUserProfileUrl' || ''))
  const [selectedRoom, setSelectedRoom] = useState(sessionStorage.getItem('selectedRoom' || ''))
  const [messagesText, setMessagesText] = useState([])
  const [prediction, setPrediction] = useState('');
  const [emojiState, setEmojiState] = useState(false)

  
  useEffect(() => {
    if (!selectedRoom) {
      return
    }

    

    const queryMessages = query(
      messagesRef,
      where("room", "==", selectedRoom),
      orderBy("createdAt"),
      )
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      let messagesText = []
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        messagesText.push(doc.data().text)
      });
      // console.log(`messages: ${JSON.stringify(messages)}`);
      // console.log(`messagesText: ${JSON.stringify(messagesText)}`);
      setMessages(messages);
      setMessagesText(messagesText)
    });
    // console.log(`selected: ${selectedUser}`);
    return () => unsuscribe();
  }, [selectedRoom]);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const q = query(collection(db, "users"), where("id", "==", currentUser.email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    }
  }, [currentUser]);

  // 유저의 정보를 가져와 이미지 주소 지정
  useEffect(() => {
    if (user && user.profileUrl) {
      const storage = getStorage();
      getDownloadURL(ref(storage, user.profileUrl))
        .then((url) => {
          const img = document.getElementById('myPhoto');
          img.setAttribute('src', url);
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    const newMessageDoc = {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: currentUser.displayName,
      room: selectedRoom
    };
    await addDoc(messagesRef, newMessageDoc);

    // Update the updateAt timestamp in sessionStorage
    sessionStorage.setItem('updateAt', newMessageDoc.createdAt);

    setNewMessage("");

    // 챗봇과 대화일 때 15번 대화가 생성되면 메시지 리스트를 서버로 보냄
    if (messages.filter(message => message.room === `챗봇:지호+${currentUser.displayName}`).length !=0 && messages.length % 15 == 0) {
      console.log(`${currentUser.displayName}님과 챗봇의 대화 데이터를 서버에 보냅니다.`)
      handlePrediction(messagesText)
    }
  };

  const handlePrediction = async(messagesText) => {
    try {
    const response = axios.post('http://localhost:5000/get_chatbot_messages', 
    { "data": messagesText })
    console.log(`response.data.message: ${JSON.stringify((await response).data)}`);} catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const sendToChatBot = async(message) => {
    try {
    const response = axios.post('http://localhost:5000/chatbot_message', 
    { "data": newMessage })
    message.preventDefault();

    if (newMessage === "") return;
    const newMessageDoc = {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: currentUser.displayName,
      room: selectedRoom
    };
    await addDoc(messagesRef, newMessageDoc);

    const newMessageDoc2 = {
      text: JSON.stringify((await response).data),
      createdAt: serverTimestamp(),
      user: "SomeLine",
      room: selectedRoom
    };
    await addDoc(messagesRef, newMessageDoc2);

    // Update the updateAt timestamp in sessionStorage
    sessionStorage.setItem('updateAt', newMessageDoc.createdAt);

    setNewMessage("");
    console.log(`response.data.message: ${JSON.stringify((await response).data)}`);} catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEmoji = async(emoji) => {
    try {
    const response = axios.get('http://localhost:5000/get_chatbot_messages', 
    { "data": emoji })
    console.log(`response.data.message: ${JSON.stringify((await response).data)}`);} catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClearChat = async () => {
    const querySnapshot = await getDocs(
      query(messagesRef, where("room", "==", selectedRoom))
    );
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        updatedAt: serverTimestamp(),
        removeText: "이 메시지는 삭제되었습니다."
      });
    });

    await batch.commit();
  };

 


  // 감정 이모티콘이 올라가게 올라가게 만드는 함수들입니다.
  const [hartClicked, hartIsClicked] = useState(false);
  const [sadClicked, sadIsClicked] = useState(false);
  const [angryClicked, angryIsClicked] = useState(false);

  const [hartKey, setHartKey] = useState(Math.random());
  const [sadKey, setSadKey] = useState(Math.random());
  const [angryKey, setAngryKey] = useState(Math.random());

  const hart_Click = () => {
    hartIsClicked(true);
    setHartKey(Math.random()); 
    setTimeout(() => hartIsClicked(false), 3000);
  };

  const sad_Click = () => {
    sadIsClicked(true);
    setSadKey(Math.random()); 
    setTimeout(() => sadIsClicked(false), 3000);
  };

  const angry_Click = () => {
    angryIsClicked(true);

    setAngryKey(Math.random()); 
    setTimeout(() => angryIsClicked(false), 3000);
  };;


  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        {/* <img src="img/main_photo.jpeg" type='video/mp4' /> */}
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='you_chat_Profil'>
        <div className='chat_Profil_img_box'>
          <img className='chat_Profil_img' src={selectedProfileUrl}/>
        </div>
        <h2 className='you_chat_Profil_name'>{selectedUserName}</h2>
        <div key={hartKey} className={`emt_hart ${hartClicked ? 'moveFadeOut' : ''}`}>💕</div>
        <div key={sadKey} className={`emt_sad ${sadClicked ? 'moveFadeOut' : ''}`}>😢</div>
        <div key={angryKey} className={`emt_angry ${angryClicked ? 'moveFadeOut' : ''}`}>👿</div>
      </div>
      <div className='chatbox_box'>
        <div className='chatbox_btn_box'>
          <Link to='/chatlist'><button className='chatbox_in_top_btn'>{"< 나가기"}</button></Link>
          <button className='chatbox_in_top_btn' onClick={handleClearChat}>{"대화내용 지우기 >"}</button>
        </div>
        <div className='messages'>
          {messages
          .filter(message=> message.removeText != '이 메시지는 삭제되었습니다.')
          .map((message) => (
            <div key={message.id} className={`message ${message.user === currentUser.displayName ? "my-message" : "other-message"}`}>
                <div className='chatbox_talk_box'><span className="user">{message.text}</span> </div>
            </div>
          ))}
        </div>
        {selectedUserName=="SomeLine" ?
          <form className='chatbox_input' onSubmit={sendToChatBot}>
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
              SomeLine말걸기
            </button>
          </form> 
        : 
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
        }
      </div>
      <div className='my_chat_Profil'>
        <div  className='chat_Profil_img_box'>
          <img id='myPhoto' className='chat_Profil_img'/>
        </div>
        
        <h2 className='my_chat_Profil_name'>{currentUser.displayName}</h2>
        {/* 해당 코드는 하트 이모션이 올라옵니다. */}
        <div key={hartKey} className={`emt_hart ${hartClicked ? 'moveFadeOut' : ''}`}>💕</div>
        <div key={sadKey} className={`emt_sad ${sadClicked ? 'moveFadeOut' : ''}`}>😢</div>
        <div key={angryKey} className={`emt_angry ${angryClicked ? 'moveFadeOut' : ''}`}>👿</div>
        
        <div className='imotion_box'>

          <button className='imotion_btn imotion_btn_hart_btn' onClick={hart_Click}>💕</button>
          <button className='imotion_btn imotion_btn_sad_btn' onClick={sad_Click}>😢</button>
          <button className='imotion_btn imotion_btn_angry_btn' onClick={angry_Click}>👿</button>
        </div>
      </div>

    </div>
  )
}

export default ChatBox;