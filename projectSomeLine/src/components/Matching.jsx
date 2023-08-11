import React, { useRef, useState, useContext, useEffect, useCallback } from 'react';
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
import ReactCanvasConfetti from 'react-canvas-confetti';


const Matching = () => {

  const { currentUser } = useContext(AuthContext);

  // 현재 유저의 db 정보
  const [user, setUser] = useState(null);

  const [genderUsers, setGenderUsers] = useState([])
  const [maleUsers, setMaleUsers] = useState([])
  const [check, setCheck] = useState(false)
  const [btnCheck, setBtnCheck] = useState([])
  const [requestStatus, setRequestStatus] = useState({});

  // 폭죽 효과를 위한 ...
  const [fire, setFire] = useState(new Date().getTime());

  const [isVisiblePopup, setIsVisiblePopup] = useState(true);
  const matClosePopup = () => {
    setIsVisiblePopup(false);
  };

  const swiperRef = useRef(null);

  // const goNextSlide = () => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.slideNext();
  //   }
  // };

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
        if (doc.exists()) {
          usersList.push({ ...doc.data(), id: doc.id });
        }
      });

      const calculateOverlapCount = (set1, set2) => {
        let count = 0;
        set1.forEach(item => {
          if (set2.has(item)) {
            count++;
          }
        });
        return count;
      };

      const sortedLists = usersList.sort((a,b)=> {
        const overlapA = calculateOverlapCount(new Set(user.interest), new Set(a.interest))
        const overlapB = calculateOverlapCount(new Set(user.interest), new Set(b.interest))
        return overlapB-overlapA
      })

      console.log(`sortedLists: ${JSON.stringify(sortedLists[0]?.name)}`);
      // setGenderUsers(usersList);
      setGenderUsers(sortedLists);
      console.log(`genderUsers: ${JSON.stringify(genderUsers[0]?.name)}`);
      setCheck(true);

    });
  }
}, [user]);

  const findOverlappingElements = (set1, set2) => {
    const overlappingElements = [];
    set1.forEach(item => {
      if (set2.has(item)) {
        overlappingElements.push(item);
      }
    });
    return overlappingElements;
  };




  const addUserToList = async(userName) => {
    setBtnCheck(prevCheck => [...prevCheck,userName.name])
    setRequestStatus(prevStatus => ({ ...prevStatus, [userName.name]: 'accepted' }))
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("id", "==", currentUser.email))
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        chatListName : arrayUnion(userName.name),
        chatListProfileUrl : arrayUnion(userName.profileUrl),
        chatListCreatedAt : arrayUnion(userName.createdAt),
        requestList : arrayUnion(userName.name)
      });
    });

    const querySnapshot2 = await getDocs(
      query(usersRef, where("name", "==", userName.name))
    );
    querySnapshot2.forEach((doc) => {
      updateDoc(doc.ref, {
        chatListName : arrayUnion(user.name),
        chatListProfileUrl : arrayUnion(user.profileUrl),
        chatListCreatedAt : arrayUnion(user.createdAt),
        responseList : arrayUnion(user.name)
      });
    });
  };

  const tryUserToList = async(userName) => {
    setBtnCheck(prevCheck => [...prevCheck,userName.name])
    setRequestStatus(prevStatus => ({ ...prevStatus, [userName.name]: 'requested' }))
    console.log(`requestStatus: ${JSON.stringify(requestStatus)}`);
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("id", "==", currentUser.email))
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        requestList : arrayUnion(userName.name)
      });
    });

    const querySnapshot2 = await getDocs(
      query(usersRef, where("name", "==", userName.name))
    );
    querySnapshot2.forEach((doc) => {
      updateDoc(doc.ref, {
        responseList : arrayUnion(user.name)
      });
    });
  };


  const handleClick = useCallback((user) => {
    addUserToList(user);
    setFire(new Date().getTime()); // 폭죽 효과
  }, [user, addUserToList, fire]); 

      
      
  

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
            {genderUsers
            // 추천된 유저의 매칭 요청을 받은 리스트에 내 이름이 있으면 안보이게함
            // 즉, 한번 매칭 요청했으면 다시 안보이게 함
            .filter((temp)=>!user.requestList?.includes(temp.name))
            .map((genderuser)=>
              <SwiperSlide key={genderuser.name}>
                <div className='mat_info_card'>
                  <div className='info_img_box'>
                    <img className='matching_img' src={genderuser.profileUrl} />
                  </div>
                  <div className='info_info_box'>
                    {genderuser.requestList?.includes(currentUser.displayName) ? (
                      btnCheck.includes(genderuser.name) ? <p className='mat_p_align'>매칭 완료 🥰🎉<br/>
                      <span >대화를 시작하세요</span><span className='matching_requesting_text'>....</span></p> :
                        // 현재 유저 이름이 matchedList에 있으면 "매칭하기" 표시
                        <div className='matching_success_um'>
                          <div className='info_info_box_name_info'>
                            <p>{genderuser.name} • {genderuser.age}세 ✨</p>
                            <p >{genderuser.address} • {genderuser.job} ✨</p>
                            <div className='mat_Interest_list'>
                              {genderuser.interest.map((item)=>(user.interest.includes(item) ? <p style={{color: '#e65ae6'}}>{item}</p> : <p>{item}</p>))}  
                            </div>
                          </div>
                          <button
                            className='matching_submit_button'
                            onClick={() => handleClick(genderuser)}
                            disabled={btnCheck.includes(genderuser.name)}
                          >
                            매칭하기
                          </button>
                        </div>
                      ) : (
                        // 현재 유저 이름이 matchedList에 없으면 "요청하기" 표시
                        requestStatus[genderuser.name] === 'requested' ? <p className='mat_p_align'>요청완료🥰<br/>
                          <span >응답을 기다리는 중</span><span className='matching_requesting_text'>....</span>
                        </p> :
                        <div className='matching_success_um'> 
                          <div className='info_info_box_name_info'>                          
                            <p>{genderuser.name} • {genderuser.age}세 ✨</p>
                            <p >{genderuser.address} • {genderuser.job} ✨</p>
                            <div className='mat_Interest_list'>
                              {genderuser.interest.map((item)=>(user.interest.includes(item) ? <p style={{color: '#e65ae6'}}>{item}</p> : <p>{item}</p>))}
                            </div>
                          </div>
                          <button
                            className='matching_submit_button'
                            onClick={() => tryUserToList(genderuser)}
                            disabled={requestStatus[genderuser.name] === 'requested'}
                          >
                            요청하기
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          ):<Loading/>}
        </div>
        <ReactCanvasConfetti
                          fire={fire}
                          particleCount={300}
                          spread={300}
                          origin={{ y: 0.5 }}
                          className='fire_jump'
                        />
    </div>
  )
}

export default Matching