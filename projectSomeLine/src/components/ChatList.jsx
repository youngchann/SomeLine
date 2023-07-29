import React, { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

/* 바닐라 틸트를 실행시키기 위한 함수입니다. - 작업자: 이찬용
틸트안에 속성을 줌으로서 바닐라 틸트 제작자가 만든 기능들을 활용합니다.
이 바닐라 틸트는 채팅창 대화 미리보가에 적용 되었습니다.*/
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
  // isVisible의 초기값을 false로 설정하여 새로운 메시지가 없을 때는 팝업이 뜨지 않도록 했습니다.
  const [isVisible, setIsVisible] = useState(false);
  const closePopup = () => {
    setIsVisible(false);
  };

  // 바닐라 틸트를 실행시키기 위한 함수입니다. -작업자 : 이찬용
  const options = {
    scale: 1.01,
    speed: 1000,
    max: 5
  };

  // chat 데이터의 초기화
  const [chats, setChats] = useState([
    { name: '김춘자', content: '대화내용입니다.' },
    { name: '이향자', content: '대화내용입니다.' },
    { name: '추정화', content: '대화내용입니다.' },
    { name: '이영자', content: '대화내용입니다.' },
  ]);

  // chats 상태 값이 변화할 때마다 실행되는 useEffect를 추가했습니다. 
  // 이로써 새로운 채팅이 추가될 때마다 isVisible 상태 값을 true로 변경하여 팝업창을 띄웁니다.
  // chats의 이전 값을 기억하기 위한 ref입니다.
  const prevChats = useRef(chats);

  useEffect(() => {
    // 만약 chats의 이전 값과 현재 값이 다르다면 (즉, 새로운 메시지가 추가되었다면) isVisible을 true로 설정합니다.
    if (prevChats.current !== chats) {
      setIsVisible(true);
    }
    // useEffect의 cleanup 함수에서 현재 chats 값을 이전 값으로 설정합니다.
    return () => {
      prevChats.current = chats;
    };
  }, [chats]);

  return (
    <div className='chatlist_bg'>
      <div className={`chatlist_popup_page ${isVisible ? '' : 'hidden'}`}>
          <button className='chatlist_popup_page_close' onClick={closePopup}>X</button>
          <div className='chatlist_popup_page_text'>
            <h4>💬 알림.</h4>
            <p>이찬용님, 설레이는 새로운 메세지가 도착했어요!</p>
          </div>
        </div>

      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain10.mp4' type='video/mp4' />
        </video>
      </div>

      <div className='chatlist_box'>
        <div className='chatlist_box_in'>
          <div className='chatlist_list_header'><h1>~ 채팅창 리스트 ~</h1></div>
          <hr/>
          <div className='chatlist_inner_box'>
            {chats.map((chat, index) => (
              <Tilt key={index} options={options} className='chat_list_contents'>
                <div className='chat_list_pro_img'></div>
                <p className='chat_list_name'>{chat.name}</p>
                <p className='chat_con_miri'>{chat.content}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatList;