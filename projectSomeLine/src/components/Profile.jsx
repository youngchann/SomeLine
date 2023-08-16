import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
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

import Loading from './Loading';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");

  const [originalUser, setOriginalUser] = useState(null); // 작업자 : 이찬용 8월 5일 12시


  const storage = getStorage(firebase);

  // 현재 로그인 유저 정보 조회를 위한 기능
  useEffect(() => {
    if (currentUser && currentUser.email) {
      const q = query(collection(db, "users"), where("id", "==", currentUser.email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUser(userData);
          setOriginalUser(userData);
  
          // 초기 이름과 사진 상태 설정
          setName(userData.name);
          setJob(userData.job);
          setAddress(userData.address);
          setProfileImage(userData.profileUrl);  // 이미지 URL 저장, Firebase Storage에서 가져옵니다.
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
          if (img) {
            img.setAttribute('src', url);
          }
        })
        .catch((error) => {
          alert(`에러 : ${error}`);
        });
    }
  }, [user]);


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

    // 이름과 이미지가 비어 있는지를 확인 하기 위해 존재합니다.
    const isNameChanged = name !== originalUser.name;
    const isJobChanged = job !== originalUser.age;
    const isAddressChanged = address !== originalUser.address;
    const isImageChanged = imageUpload !== null;

    if (isNameChanged || isImageChanged || isJobChanged || isAddressChanged) {      //프로필 내용추가되면. 여기도 추가, 이찬용: 8월 5일 12시
      try {
        let downloadUrl;
        if (isImageChanged) {
          const imageRef = ref(storage, `images/${name + v4()}`);
          await uploadBytes(imageRef, imageUpload);
          downloadUrl = await getDownloadURL(imageRef);
        } else {
          // 이미지가 들어오지 않으면 null값의 이미지로 변경시키는 문제가 발생하여 수정하여 넣은 부분입니다. -이찬용
          // 이미지가 변경되지 않았다면 기존 URL을 사용합니다.
          downloadUrl = originalUser.profileUrl;
        }

        await updateProfile(currentUser, {
          displayName: isNameChanged ? name : originalUser.name,
          photoURL: downloadUrl,
        });
  
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(
          query(usersRef, where("id", "==", currentUser.email))
        );
        
        // 삼항식을 추가 하였습니다. isNameChanged 가 트루면 name을 팔스면 originalUser.name를 사용하게 했습니다. --이찬용
        // 변경되었으면 새로운 이름을 아니면 기존의 이름을 사용하게 하였습니다.  -- 이찬용
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, {
            name: isNameChanged ? name : originalUser.name,
            job: isJobChanged ? job : originalUser.job,
            addres: isAddressChanged ? address : originalUser.address,
            profileUrl: downloadUrl,
          });
        });
  
        // 프로필 업데이트 후 새로운 사용자 정보를 가져와서 화면에 표시합니다. 
        const updatedUser = { ...user, name: isNameChanged ? name : originalUser.name, profileUrl: downloadUrl };
        setUser(updatedUser);

        alert('수정완료')
      } catch (error) {
        alert(`수정실패\nerror: ${error}`);
      }
    } else {
      alert("수정된 정보가 없습니다.");
    }
  };

  // user가 null이 아닌 경우, 프로필 정보를 화면에 표시
  return (
    <div className='matching_bg'>
      <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
          <source src='videos/mainmain15.mp4' type='video/mp4' />
        </video>
      </div>
      
      <div className='profile_in_box'>
        {user ? ( <div className='profile_loading'>
        <div className='profile_box_header_box'>
          <div className='profile_box_logo'></div>
          <div className='profile_box_header_name'>Profile</div>
        </div>
       
        <div className='profile_img_chainge_box'>
          <div className='profile_img_text'><h1>사진</h1></div>
          <div className='profile_img_chainge_input_box'>
            <div className='profile_img_chainge'>
              <img 
                src={profileImage || currentUser.photoURL || 'defaultImageLink'} 
                alt="변경할 사진" 
                className="profile_img_chainge_at" 
              />
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className='profile_img_chainge_btn'
            />
          </div>
        </div>
        <div  className='profile_name_chainge_box'>
          <div className='profile_name_chainge_text'><h1>이름</h1></div>
          <form className="profile_name_chainge_input">
            <input
            className="profile_name_input_in"
            id="id"
            placeholder= {`현재 이름은 "${user.name}"입니다.`}
            onChange={(e) => setName(e.target.value)}
            maxLength={6}
            // value={name}     // 플레이스 홀더보다 상위라서 홀더플레이스가 보이지 않는 현상이 일어났습니다. 그래서 주석처리함 --이찬용
            ></input>
          </form>
        </div>
        <div  className='profile_myinfo_box'>
          <div className='profile_myinfo_box_text'><h1>한줄 소개</h1></div>
          <form className="profile_myinfo_box_input">
            {/* <textarea
            className="profile_myinfo_box_input_in"
            // id="id"
            type='textarea'
            ></textarea> */}
            <input
            className="profile_myinfo_box_input_in"
            placeholder= {"한줄 소개 공간"}
            maxLength={30}
            ></input>
          </form>
        </div>
        <div  className='profile_myinfo_box'>
          <div className='profile_myinfo_box_text'><h1>정보</h1></div>
          <form className="profile_myinfo_box_input">
            
            <input
            className="profile_myinfo_box_input_in"
            id="profile_myinfo_address"
            placeholder= {user.job}
            onChange={(e) => setJob(e.target.value)}
            maxLength={6}
            ></input>
            <input
            className="profile_myinfo_box_input_in"
            id="profile_myinfo_job"
            placeholder= {user.address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength={6}
            ></input>
          </form>
        </div>
        <div  className='profile_myinfo_box'>
          <div className='profile_myinfo_box_text'><h1>나의 성향</h1></div>
          <div className='profile_myinfo_box_interest'>
          {user.interest.slice(-3).map((item)=><span className='profile_myinfo_box_interest_span'>{item}</span>)}
          </div>
          {/* <Link to='/tendency' className='profile_info_customer_button'>나의 성향</Link> */}
          {/* <button className='profile_mat_customer_button'>매칭 설정</button> */}
        </div>
        <div className='profile_chainge_button_box'><button onClick={handleSubmit} className='profile_submit_button'>수정하기</button></div>
        </div> ): <Loading/>}
      </div>
    </div>
  );
};

export default Profile;