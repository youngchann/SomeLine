import React, { useRef, useState, useContext, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { AuthContext } from "../context/AuthContext";

import { db, firebase } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes, listAll } from "firebase/storage";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const storage = getStorage(firebase);

  // 현재 로그인 유저 정보 조회를 위한 기능
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
    // 이미지 가져오는 코드가 있을 때만 실행하도록 수정
    if (user && user.profileUrl) {
      const storage = getStorage();
      getDownloadURL(ref(storage, user.profileUrl))
        .then((url) => {
          const img = document.getElementById('myimg');
          img.setAttribute('src', url);
          console.log(url);
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);


  const upload = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name+currentUser.displayName}`);
    uploadBytes(imageRef, imageUpload)
  };

  // user가 null인 경우, Loading 메시지를 표시
  if (!user) {
    return <p>Loading...</p>;
  }

  // user가 null이 아닌 경우, 프로필 정보를 화면에 표시
  return (
    <div className='matching_bg'>
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain10.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='profile_in_box'>
        <div className='profile_box_header_box'>
          <div className='profile_box_logo'></div>
          <div className='profile_box_header_name'>Profile
          </div>
          <div>
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button onClick={upload}>업로드</button>
          </div>
        </div>
        <div className='profile_img_chainge_box'>
          <div className='profile_img_text'><h1>사진</h1></div>
          <div className='profile_img_chainge'></div>
        </div>
        <div  className='profile_name_chainge_box'>
          <div className='profile_name_chainge_text'><h1>이름</h1></div>
          <form className="profile_name_chainge_input">
            <input
            className="profile_name_input_in"
            id="id"
            placeholder= {user.name}
            ></input>
          </form>
        </div>
        <div  className='profile_myinfo_box'>
          <div className='profile_myinfo_box_text'><h1>자기 소개</h1></div>
          <form className="profile_myinfo_box_input">
            <textarea
            className="profile_myinfo_box_input_in"
            // id="id"
            type='textarea'
            ></textarea>
          </form>
        </div>
        <div className='profile_chainge_button_box'><button className='profile_submit_button'>수정하기</button></div>
      </div>
      
    </div>
  );
};

export default Profile;
