import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const RoomSelection = ({ setRoom, setIsInChat }) => {

    const [users, setUsers] = useState([])
    const userRef = collection(db, "user") 
    
    useEffect(()=>{
        const queryUsers = query(
            userRef, where("interest", "==", "여행")
        )
        const unsuscribe2 = onSnapshot(queryUsers, (snapshot)=>{
            let users=[]
            snapshot.forEach((doc)=>{
                users.push({...doc.data(), id: doc.id})
            })
            setUsers(users)
        })
        return ()=> unsuscribe2()
    },[])
  
    return (
    <div className="room">
      {users.map((i) => (
        <button
          key={i.id}
          onClick={() => {
            setRoom(i.username)
            setIsInChat(true);
          }}
        >
          {i.username}
        </button>
      ))}
    </div>
  );
};

export default RoomSelection;
