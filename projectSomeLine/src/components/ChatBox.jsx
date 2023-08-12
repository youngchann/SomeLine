import React, { useState, useEffect, useContext,useCallback} from 'react';
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

import ReactCanvasConfetti from 'react-canvas-confetti';



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
  const [emojiState, setEmojiState] = useState("")


  // 눈 내리는 효과를 위한 useState, 배경페이지 변경
  const [snow, setSnow] = useState(new Date().getTime());
  const [sakura, setSakura] = useState(new Date().getTime());

  const handleClickSnow = () => {
    setSnow(new Date().getTime());
  };
  const handleClickSakura = () => {
    setSakura(new Date().getTime());
  };
  // 눈 내리는 효과 여기까지다.


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
  };

  const handlePrediction = async(messagesText) => {
    try {
    const response = axios.post('http://localhost:5000/get_chatbot_messages', 
    { "data": messagesText })
    console.log(`관심사: ${JSON.stringify((await response).data)}`);} catch (error) {
      console.error('관심사 error occurred:', error);
    }
  };

  const sendToChatBot = async(message) => {
    try {
    const response = axios.post('http://localhost:5000/chatbot_message', 
    { "data": messagesText,
      "newData" : newMessage,
      "name" : currentUser.displayName
     })
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

    if (messages.length !=0 && messages.length % 10 == 0) {
      console.log(`${currentUser.displayName}님과 챗봇의 대화 데이터를 서버에 보냅니다.`)
      handlePrediction(messagesText)
    }
    console.log(`response.data.message: ${JSON.stringify((await response).data)}`);} catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEmoji = async(emoji) => {
    try {
    const response = axios.post('http://localhost:5000/emoji', 
    { "data": emoji })
    console.log(`response.data.message: ${JSON.stringify((await response).data)}`);
    setEmojiState(JSON.stringify((await response).data))
    } 
    catch (error) {
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

  const [hearts, setHearts] = useState([]);
  const [sads, setSads] = useState([]);
  const [angrys, setAngrys] = useState([]);

  // 프로필 팝업을 띄우기 위한 코드입니다.~~~
  const [isVisible, setIsVisible] = useState(false);

  const handleProfileClick = (e) => {
    // 마우스 클릭한 위치의 x, y 좌표를 추출
    const x = e.clientX;
    const y = e.clientY;

    // CSS 변수 값을 변경
    const popupBox = document.querySelector('.mychat_Profil_click_box');
    if (popupBox) {
      popupBox.style.setProperty('--popup-x', `${x}px`);
      popupBox.style.setProperty('--popup-y', `${y}px`);
    }
    
    setIsVisible(true);
  };

  const profilPopupClose = () => {
    setIsVisible(false);
  }

  // 감정 이모션을 실행하는 함수들.,
  const handleEmojiClick = (emoji, setIsClicked, setKey, setEmojis) => {
    handleEmoji(emoji);
    setIsClicked(true);
    setKey(Math.random());
    setEmojis(prev => [...prev, Math.random()]);
    setTimeout(() => setIsClicked(false), 3000);
  };
  const hart_Click = () => {
    handleEmojiClick("hart", hartIsClicked, setHartKey, setHearts);
  };
  
  const sad_Click = () => {
    handleEmojiClick("sad", sadIsClicked, setSadKey, setSads);
  };
  
  const angry_Click = () => {
    handleEmojiClick("angry", angryIsClicked, setAngryKey, setAngrys);
  };


  return (
    <div className='chatbox_bg'>
      <div className="login_bgm_b">
        {/* <img src="img/main_photo.jpeg" type='video/mp4' /> */}
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain9.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='you_chat_Profil'>
        <div className='chat_Profil_img_box' onClick={handleProfileClick}>
          <img className='chat_Profil_img' src={selectedProfileUrl}/>
        </div>
        <h2 className='you_chat_Profil_name'>{selectedUserName}</h2>
        {emojiState == "hart" && 
        <div key={hartKey} className={`emt_hart ${hartClicked ? 'moveFadeOut' : ''}`}>💕</div>}
        {emojiState == "sad" &&
        <div key={sadKey} className={`emt_sad ${sadClicked ? 'moveFadeOut' : ''}`}>😢</div>}
        {emojiState == "angry" &&
        <div key={angryKey} className={`emt_angry ${angryClicked ? 'moveFadeOut' : ''}`}>👿</div>}
      </div>
      <div className='chatbox_box'>
        <div className='chatbox_btn_box'>
          <Link to='/chatlist'><button className='chatbox_in_top_btn'>{"< 나가기"}</button></Link>
          <button className='chatbox_in_top_btn' onClick={handleClearChat}>{"대화내용 지우기 >"}</button>
        </div>
        <div className='messages'>
        <ReactCanvasConfetti
          fire={snow}
          particleCount={400}
          spread={400}
          origin={{ x: Math.random(), y: -1.1 }} 
          drift={Math.random() * 0.2 - 0.1}
          className='fire_jump'
          colors={['#ffffff']}
          width={800}
        />
        <ReactCanvasConfetti
          fire={sakura}
          particleCount={400}
          spread={400}
          origin={{ x: Math.random(), y: -1.1 }} 
          drift={Math.random() * 0.2 - 0.1}
          className='fire_jump'
          colors={['#FF9DB2']}
          width={800}
        />
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
              보내기
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
        {hearts.map((hartKey) => (<div key={hartKey} className="emt_hart moveFadeOut">💕</div>))}
        {sads.map((sadKey) => (<div key={sadKey} className="emt_sad moveFadeOut">😢</div>))}
        {angrys.map((angryKey) => (<div key={angryKey} className="emt_angry moveFadeOut">👿</div>))}
  
        <div className='imotion_box'>
          <button className='imotion_btn imotion_btn_hart_btn' onClick={hart_Click}>💕</button>
          <button className='imotion_btn imotion_btn_sad_btn' onClick={sad_Click}>😢</button>
          <button className='imotion_btn imotion_btn_angry_btn' onClick={angry_Click}>👿</button>
          <button className='imotion_btn imotion_btn_angry_btn' onClick={handleClickSnow}>❄️</button>
          <button className='imotion_btn imotion_btn_angry_btn' onClick={handleClickSakura}>🌸</button>
          <button className='imotion_btn imotion_btn_angry_btn' >🌆</button>
        </div>
      </div>
      <div className={isVisible ? 'mychat_Profil_click_box active' : 'mychat_Profil_click_box'}>
        <button className='mychat_Profil_click_box_close_btn' onClick={profilPopupClose}>X</button>
        <div className='mychat_Profil_click_box_img_box'>
          <img src={selectedProfileUrl} alt="Profile"/>
        </div>
        <div className='mychat_Profil_click_box_info'>
          <h4>{selectedUserName}</h4>
          <div className='mychat_Profil_click_box_info_heart'>
            <span>❤️</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox;