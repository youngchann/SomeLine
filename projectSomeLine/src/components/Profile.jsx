import React, { useRef, useState, useContext, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { AuthContext } from "../context/AuthContext";


import { db } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL} from "firebase/storage"

const Profile = () => {

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const q = query(collection(db, "users"), where("id", "==", currentUser.email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      });
    }
  }, [])

  // const storage = getStorage();
  // getDownloadURL(ref(storage, user.profileUrl))
  //   .then((url) => {
  //     const img = document.getElementById('myimg');
  //     img.setAttribute('src', url);
  //     console.log(url);
  //   })
  //   .catch((error) => {
  //     alert(`에러 : ${error}`)
  //   });
   


  
    return (
      <div className='matching_bg'>
          <div className="login_bgm_b">
              <video className="login_bgm" autoPlay muted loop>
                <source src='videos/mainmain10.mp4' type='video/mp4' />
              </video>
          </div>
          <div className='matching_in_box'>
                  <div className='mat_info_card'>
                    <div className='info_img_box'>
                      <img id='myimg'/>
                    </div>
                    <div className='info_info_box'>
                        <>
                          <p>이름: {user.name}</p>
                          <p>나이: {user.age}</p>
                        </>
                    </div>
                  </div>
          </div>
      </div>
    )
}


export default Profile