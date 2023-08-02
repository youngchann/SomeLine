import React, { useRef, useState, useContext, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import {v4} from 'uuid'
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
  updateDoc
} from "firebase/firestore";
import { updateProfile } from "firebase/auth"
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");


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
    if (user && user.profileUrl) {
      const storage = getStorage();
      getDownloadURL(ref(storage, user.profileUrl))
        .then((url) => {
          const img = document.getElementById('myimg');
          img.setAttribute('src', url);
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);


  // user가 null인 경우, Loading 메시지를 표시
  if (!user) {
    return <p>Loading...</p>;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageUpload(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    console.log(`userRef: ${user}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageRef = ref(storage, `images/${name+v4()}`)
      await uploadBytes(imageRef, imageUpload)
      const downloadUrl = await getDownloadURL(imageRef)

      await updateProfile(currentUser, {
          displayName: name,
          photoURL: downloadUrl,
      })

      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("id", "==", currentUser.email))
      );

      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          name: name,
          profileUrl: downloadUrl,
        });
      });


      // 프로필 업데이트 후 새로운 사용자 정보를 가져와서 화면에 표시
      const updatedUser = { ...user, name: name, profileUrl: downloadUrl };
      setUser(updatedUser);


      alert('수정완료')
    } catch (error) {
      alert(`수정실패\nerror: ${error}`);
    }
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
          <div className='profile_box_header_name'>Profile</div>
        </div>
       
        <div className='profile_img_chainge_box'>
          <div className='profile_img_text'><h1>사진</h1></div>
          <div className='profile_img_chainge'>
            <img className='profile_img_chainge' id='myimg' />
          </div>
          <div>
          {/* 변경할 사진 선택하여 미리보기 기능  */}
          <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className='profile_img_chainge_btn'
            />
          </div>
          {profileImage && (
              <img 
                  src={profileImage}
                  alt='변경할 사진'
                  className="profile_img_chainge"
              />
          )}
        </div>
        <div  className='profile_name_chainge_box'>
          <div className='profile_name_chainge_text'><h1>이름</h1></div>
          <form className="profile_name_chainge_input">
            <input
            className="profile_name_input_in"
            id="id"
            placeholder= {`현재 이름은 "${user.name}"입니다.`}
            onChange={(e) => setName(e.target.value)}
            value={name}
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
        <div className='profile_chainge_button_box'><button onClick={handleSubmit} className='profile_submit_button'>수정하기</button></div>
      </div>
      
    </div>
  );
};

export default Profile;