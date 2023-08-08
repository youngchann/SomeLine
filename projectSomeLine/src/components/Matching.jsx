import React, { useRef, useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { AuthContext } from "../context/AuthContext";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { db, firebase } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  updateDoc,
  addDoc,
  arrayUnion
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import Loading from './Loading';


const Matching = () => {

  const { currentUser } = useContext(AuthContext);

  // 현재 유저의 db 정보
  const [user, setUser] = useState(null);

  const [femaleUsers, setFemaleUsers] = useState([])
  const [maleUsers, setMaleUsers] = useState([])
  const [check, setCheck] = useState(false)
  const [btnCheck, setBtnCheck] = useState([])

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
  if (currentUser && currentUser.email && user && (user.gender === 'male' || user.gender === 'female')) {
    const genderQuery = query(userRef, where("gender", "==", user.gender === 'male' ? 'female' : 'male'));
    getDocs(genderQuery).then((querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists() && !user.chatListName.includes(doc.data().name)) {
          usersList.push({ ...doc.data(), id: doc.id });
        }
      });
      if (user.gender === 'male') {
        setFemaleUsers(usersList);
        setCheck(true);
      } else {
        setMaleUsers(usersList);
        setCheck(true);
      }
    });
  }
}, [user]);




  const addUserToList = async(userName) => {
    setBtnCheck(prevCheck => [...prevCheck,userName.name])
    
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("id", "==", currentUser.email))
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        chatListName : arrayUnion(userName.name),
        chatListProfileUrl : arrayUnion(userName.profileUrl),
        chatListCreatedAt : arrayUnion(userName.createdAt),
        chatTest : arrayUnion(userName.name)
      });
    });
  };

      
      
  

  return (
    <div className='matching_bg'>
        <div className={isVisiblePopup ? 'mat_popup' : 'hidden'}>
          <button className='mat_popup_close' onClick={matClosePopup}>X</button>
          <div className='mat_popup_text'>
            <h4>💬 알림.</h4>
            <p><strong>{currentUser.displayName}</strong>님, 새로운 매칭이 도착했어요!</p>
          </div>
        </div>
        <div className="login_bgm_b">
            <video className="login_bgm" autoPlay muted loop>
              <source src='videos/mainmain10.mp4' type='video/mp4' />
            </video>
        </div>
        <div className='matching_in_box'>
        {check ? (
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            ref={swiperRef}
          >
            {femaleUsers.map((user)=>
              <SwiperSlide key={user.name}>
                <div className='mat_info_card'>
                  <div className='info_img_box'>
                    <img className='matching_img'  src={user.profileUrl} />
                  </div>
                  <div className='info_info_box'>
                      { btnCheck.includes(user.name) ? <p>매칭된 상대방입니다.🥰</p> : (
                      <div className='matching_success_um'>
                        <p>◦ {user.name},  {user.age}세</p>
                        <p>자기소개 내용!</p>
                        <button className='matching_submit_button' onClick={()=>addUserToList(user)} disabled={btnCheck.includes(user.name)} >매칭하기</button>
                      </div>) }
                  </div>
                </div>
              </SwiperSlide>
            )}
  
          </Swiper>
          ):<Loading/>}
        </div>
    </div>
  )
}

export default Matching