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