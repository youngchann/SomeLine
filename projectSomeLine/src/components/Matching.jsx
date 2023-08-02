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
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

let chatList = []

const Matching = () => {

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
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
    if (currentUser && currentUser.email) {
      const q = query(collection(db, "users"), where("id", "==", currentUser.email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (user && user.profileUrl) {
      const storage = getStorage();
      getDownloadURL(ref(storage, user.profileUrl))
        .then((url) => {
          const img = document.getElementById('matchPhoto');
          img.setAttribute('src', url);
          console.log(url);
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);

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

          // 수정된 부분: 이미지 로드가 완료되면 swiper 슬라이드를 업데이트합니다.
          swiperRef.current.swiper.update();
        });

      const storage = getStorage();

      // 수정된 부분: matchedUsers 배열 순회로 변경합니다.
      matchUsers.forEach((user) => {
        if (user.profileUrl) {
          getDownloadURL(ref(storage, user.profileUrl))
            .then((url) => {
              const img = document.getElementById(user.name);
              img.setAttribute('src', url);
              console.log(url);
            })
            .catch((error) => {
              alert(`에러 : ${error}`);
            });
        }
      });
    }
  }, [users]);

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
            <p>이찬용님, 새로운 매칭이 도착했어요!</p>
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
                    <img style={{width: 320,
                    height: 280}}  id={user.name}/>
                  </div>
                  <div className='info_info_box'>
                    {matchUsers.length > 0 && matchUsers[0] ? (
                      <>
                        <p>이름: {user.name}</p>
                        <p>나이: {user.age}</p>
                        <button className='matching_submit_button' onClick={()=>addUserToList(user.name)}>매칭하기</button>
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