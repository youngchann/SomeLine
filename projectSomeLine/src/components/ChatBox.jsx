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
  updateDoc
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";



const ChatBox = ({room}) => {

  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [user, setUser] = useState(null);
  const [selectedUserName, setSelectedUser] = useState(sessionStorage.getItem('selectedUserName' || ''))
  const [selectedProfileUrl, setSelectedProfileUrl] = useState(sessionStorage.getItem('selectedUserProfileUrl' || ''))
  const [selectedRoom, setSelectedRoom] = useState(sessionStorage.getItem('selectedRoom' || ''))



  
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", selectedRoom),
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
    // console.log(`selected: ${selectedUser}`);
    return () => unsuscribe();
  }, []);

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
          console.log(url);
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: currentUser.displayName,
      room : selectedRoom
    });


    setNewMessage("");
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
        {/* <div className='chat_Profil_img'></div> */}
        <img className='chat_Profil_img' src={selectedProfileUrl}/>
        <h2 className='you_chat_Profil_name'>{selectedUserName}</h2>
      </div>
      <div className='chatbox_box'>
        <div className='messages'>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.user === currentUser.displayName ? "my-message" : "other-message"}`}>
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
        {/* <div  className='chat_Profil_img'></div>  */}
        <img id='myPhoto' className='chat_Profil_img'/>
        
        <h2 className='my_chat_Profil_name'>{currentUser.displayName}</h2>
        {/* 해당 코드는 하트 이모션이 올라옵니다. */}
        <div key={hartKey} className={`emt_hart ${hartClicked ? 'moveFadeOut' : ''}`}>💕</div>
        <div key={sadKey} className={`emt_sad ${sadClicked ? 'moveFadeOut' : ''}`}>😢</div>
        <div key={angryKey} className={`emt_angry ${angryClicked ? 'moveFadeOut' : ''}`}>👿</div>
        
        <div className='imotion_box'>

          <button className='imotion_btn imotion_btn_hart_btn' onClick={hart_Click}>💕좋아</button>
          <button className='imotion_btn imotion_btn_sad_btn' onClick={sad_Click}>😢슬퍼</button>
          <button className='imotion_btn imotion_btn_angry_btn' onClick={angry_Click}>👿화나</button>
        </div>
      </div>

    </div>
  )
}

export default ChatBox;