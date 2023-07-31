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
  getDocs
} from "firebase/firestore";

const Profile = () => {

    const { currentUser } = useContext(AuthContext);

  
    const userRef = collection(db, "users") 
    
  
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
                    </div>
                    <div className='info_info_box'>
                        <>
                          <p>이름:</p>
                          <p>나이:</p>
                        </>
                    </div>
                  </div>
          </div>
      </div>
    )
}


export default Profile