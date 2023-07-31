import React, { useRef, useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { AuthContext } from "../context/AuthContext";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { db } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";
let chatList = []

const Matching = () => {

  const { currentUser } = useContext(AuthContext);

  const [isVisiblePopup, setIsVisiblePopup] = useState(true);
  const matClosePopup = () => {
    setIsVisiblePopup(false);
  };

  const swiperRef = useRef(null);

  const goNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      console.log(users[0].matchId);
      console.log(matchUsers);
      console.log(users[0]);
    }
  };

  const [users, setUsers] = useState([])
  const [matchUsers, setMatchUsers] = useState([])
  const userRef = collection(db, "users") 
    
  useEffect(()=>{
    if (currentUser && currentUser.email) {
        const queryUsers = query(
            userRef, where("id", "==", currentUser.email)
        )

        const unsuscribe = onSnapshot(queryUsers, (snapshot)=>{
            let users=[]
            snapshot.forEach((doc)=>{
                users.push({...doc.data(), id: doc.id})
            })
            setUsers(users)
        })
        return ()=> unsuscribe()
    }
  },[currentUser])

  useEffect(() => {
    if (users.length > 0 && users[0].matchId) {
      const matchIdQueries = users[0].matchId.map((id) => (
        query(userRef, where("id", "==", id))
      ));

      Promise.all(matchIdQueries.map((q) => getDocs(q)))
        .then((querySnapshots) => {
          const matchedUsers = [];
          querySnapshots.forEach((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                matchedUsers.push({ ...doc.data(), id: doc.id });
              }
            });
          });
          setMatchUsers(matchedUsers);
        });
    }

    
    
  },[users])

  const [addedUsers, setAddedUsers] = useState([]);
  

  const addUserToList = (userName) => {
    setAddedUsers((prevUsers) => [...prevUsers, userName]);
    
    chatList.push(userName)
    console.log(chatList);
  };

  return (
    <div className='matching_bg'>
        <div className={isVisiblePopup ? 'mat_popup' : 'hidden'}>
          <button className='mat_popup_close' onClick={matClosePopup}>X</button>
          <div className='mat_popup_text'>
            <h4>💬 알림.</h4>
            <p>이찬용님, 설레이는 새로운 메세지가 도착했어요!</p>
          </div>
        </div>
        <div className="login_bgm_b">
            <video className="login_bgm" autoPlay muted loop>
              <source src='videos/mainmain10.mp4' type='video/mp4' />
            </video>
        </div>
        <div className='matching_in_box'>
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            ref={swiperRef}
          >
            {matchUsers.map((user)=>
              <SwiperSlide key={user.name}>
                <div className='mat_info_card'>
                  <div className='info_img_box'>
                  </div>
                  <div className='info_info_box'>
                    {matchUsers.length > 0 && matchUsers[0] ? (
                      <>
                        <p>이름: {user.name}</p>
                        <p>나이: {user.age}</p>
                        <button onClick={()=>addUserToList(user.name)}>추가</button>
                      </>
                    ) : (
                      <p>Loading or no matched users found.</p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            )}
  
          </Swiper>
        </div>
    </div>
  )
}

export default Matching
export {chatList}