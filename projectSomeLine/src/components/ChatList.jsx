
import React, { useState, useEffect, useRef, useContext } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { db, auth } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  arrayRemove,
  updateDoc
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { chatList } from './Matching';
import { useNavigate } from "react-router-dom";
import Loading from './Loading';


/* 바닐라 틸트를 실행시키기 위한 함수입니다. - 작업자: 이찬용
틸트안에 속성을 줌으로서 바닐라 틸트 제작자가 만든 기능들을 활용합니다.
이 바닐라 틸트는 채팅창 대화 미리보기에 적용 되었습니다.*/
function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}



// 팝업창을 끄기 위해 만든 함수안에 들어가는 변수를 담기위한 것입니다. .-작업자 : 이찬용 

const ChatList = () => {


  const { currentUser } = useContext(AuthContext);
  const nav = useNavigate()

  // isVisible의 초기값을 false로 설정하여 새로운 메시지가 없을 때는 팝업이 뜨지 않도록 했습니다.
  const [isVisible, setIsVisible] = useState(null);
  const closePopup = () => {
    setIsVisible(false);
  };

  // VanillaTilt를 실행시키기 위한 함수입니다. -작업자 : 이찬용
  const options = {
    scale: 1.01,
    speed: 1000,
    max: 5
  };

  
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null)

  const userRef = collection(db, "users");
  
  const [selectedUser, setSelectedUser] = useState("")

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
    
  

  // chats 상태 값이 변화할 때마다 실행되는 useEffect를 추가했습니다. - 작업자 : 이찬용
  // 이로써 새로운 채팅이 추가될 때마다 isVisible 상태 값을 true로 변경하여 팝업창을 띄웁니다.  - 작업자 : 이찬용
  // chats의 이전 값을 기억하기 위한 ref입니다.  - 작업자 : 이찬용
  const prevChats = useRef(chats);


  const handleClick = (user, index) => {
    setSelectedUser(user)
    sessionStorage.setItem('selectedUserName', user.chatListName[index])
    sessionStorage.setItem('selectedUserProfileUrl', user.chatListProfileUrl[index])
    
    if (user.chatListProfileUrl[index] > currentUser.displayName) {
      sessionStorage.setItem('selectedRoom', `${user.chatListName[index]}+${currentUser.displayName}`)
    } else {
      sessionStorage.setItem('selectedRoom', `${currentUser.displayName}+${user.chatListName[index]}`)
    }
    nav('/chatbox')
  }

  const handleClickBot = () => {
    setSelectedUser('챗봇:지호')
    sessionStorage.setItem('selectedUserName', '챗봇:지호')
    sessionStorage.setItem('selectedUserProfileUrl', 'https://firebasestorage.googleapis.com/v0/b/chatapp2-aa1ab.appspot.com/o/images%2F%EA%B5%AD2.jpg?alt=media&token=1e4d4b55-f1b1-4e6f-a030-e06ca28a99d2')
    sessionStorage.setItem('selectedRoom', `챗봇:지호+${currentUser.displayName}`)
    
    nav('/chatbox')
  }

  // const removeUserToList = async(index) => {

  //   // alert(`채팅리스트에서 ${user.chatListName[index]}님이 삭제되었습니다😥`)

  //   const usersRef = collection(db, "users");
  //   const querySnapshot = await getDocs(
  //     query(usersRef, where("id", "==", currentUser.email))
  //   );
  //   querySnapshot.forEach((doc) => {
  //     updateDoc(doc.ref, {
  //       chatListName : arrayRemove(doc.data().chatListName[index]),
  //       chatListProfileUrl : arrayRemove(doc.data().chatListProfileUrl[index]),
  //       chatListCreatedAt : arrayRemove(doc.data().chatListCreatedAt[index]),
  //     });
  //   });

  //   setHiddenDisplay(index);
  //   nav('/chatlist#');
  // };

  const removeUserToList = async(index) => {
    // 해당 인덱스의 사용자를 제거
    const updatedChatListName = user.chatListName.filter((_, i) => i !== index);
    const updatedChatListProfileUrl = user.chatListProfileUrl.filter((_, i) => i !== index);
    const updatedChatListCreatedAt = user.chatListCreatedAt.filter((_, i) => i !== index);
  
    // 사용자 정보를 업데이트
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("id", "==", currentUser.email))
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        chatListName: updatedChatListName,
        chatListProfileUrl: updatedChatListProfileUrl,
        chatListCreatedAt: updatedChatListCreatedAt,
      });
    });
  
    // 로컬 상태 업데이트 (랜더링 트리거)
    setUser({
      ...user,
      chatListName: updatedChatListName,
      chatListProfileUrl: updatedChatListProfileUrl,
      chatListCreatedAt: updatedChatListCreatedAt,
    });
  
    // 필요하다면 다른 동작 수행
    nav('/chatlist');
  };

  return (
    <div>
      {/* {user? ( */}
    <div className='chatlist_background'>
      <div className={`chatlist_popup_page ${isVisible ? '' : 'hidden'}`}>
        <button className='chatlist_popup_page_close' onClick={closePopup}>X</button>
        <div className='chatlist_popup_page_text'>
          <h4>💬 알림.</h4>
          <p><strong>{currentUser.displayName}</strong>님, 설레이는 새로운 메세지가 도착했어요!</p>
        </div>
      </div>

      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain10.mp4' type='video/mp4' />
        </video>
      </div>

      <div className='chatlist_box'>
        <div className='chatlist_box_in'>
          <div className='chatlist_list_header'><h1>~ GROP CHAT ROOM ~</h1></div>
          <hr/>
          <div className='chatlist_inner_box'>
          {user ? (
            <div>
              <Tilt options={options} className='chat_list_contents' onClick={()=>handleClickBot()}>
                <div className='chat_list_profile_img_box'><img className='chat_list_profile_img' src='https://firebasestorage.googleapis.com/v0/b/chatapp2-aa1ab.appspot.com/o/images%2F%EA%B5%AD2.jpg?alt=media&token=1e4d4b55-f1b1-4e6f-a030-e06ca28a99d2' /></div>
                
                <p className='chat_list_name'>챗봇:지호</p>
                <p className='chat_list_talk_preview'>반가워요 ^^</p>
              </Tilt>
            {user.chatListName?.map((chat, index) => (
              <Tilt key={index} options={options} className="chat_list_contents" >
                {/* onClick={()=>handleClick(user, index)}*/}
                
                <div className='chat_list_profile_img_box'><img className='chat_list_profile_img' src={user.chatListProfileUrl[index]}/></div>
                
                <p className='chat_list_name'>{user.chatListName[index]}</p>
                <p className='chat_list_talk_preview' onClick={()=>handleClick(user, index)}>최근 메시지</p>
                <button className='chatlist_chat_del_btn' onClick={()=>removeUserToList(index)}>나가기</button>
              </Tilt>
            ))}
            </div>
            ):<Loading/>}
          </div>
        </div>
      </div>
    </div>
    {/* ): <Loading/>} */}
    </div>
  )
}

export default ChatList;