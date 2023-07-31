import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {v4} from 'uuid'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [profileImage, setProfileImage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const usersRef = collection(db, "users");
    const [profileUrl, setProfileUrl] = useState("")
    const nav = useNavigate()

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageRef = ref(storage, `images/${name + v4()}`)
        await uploadBytes(imageRef, profileImage)
        const downloadUrl = await getDownloadURL(imageRef)
        setProfileUrl(downloadUrl)
        

        const res = await createUserWithEmailAndPassword(auth, email, password)
        if (isFormValid()) {
            // 여기서 Firebase에 데이터를 보내는 로직을 작성하세요.

            await updateProfile(res.user, {
                displayName: name,
                photoURL: downloadUrl,
            })
            await addDoc(usersRef, {
                id : email,
                pw : password,
                name : name,
                gender : gender,
                age : age,
                profileUrl : downloadUrl
            });
        
            // 회원가입이 완료되면 회원가입 프로세스를 종료하고 로그인 화면으로 돌아감
            signOut(auth)
            nav('/')
        } else {
            alert("모든 필수 정보를 입력해주세요.");
        }
    };

    const handleAgeChange = (event) => {
        const value = event.target.value;
        const numericAge = parseInt(value, 10); // 문자열을 숫자로 변환

        // 나이가 음수이면 0으로 설정
        if (numericAge < 0) {
            setAge(0);
        } else {
            setAge(numericAge);
        }
    };

    const isFormValid = () => {
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            name.trim() !== "" &&
            gender.trim() !== "" &&
            age > 0 &&
            profileImage !== null
        );
    }; 
    

  return (
    <div className='sign_up_page'>
        <div className="login_bgm_b">
        <video className="login_bgm" autoPlay muted loop>
            <source src='videos/mainmain8.mp4' type='video/mp4' />
        </video>
        </div>
        <div className='sign_up_box'>
            <div className="login_box_header_name">
              <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit} className="signupbox_in_input_box">
                <input
                    className="signup_id_box"
                    id="id"
                    value={email}
                    placeholder="이메일"
                    onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input
                    className="signup_ps_box"
                    id="password"
                    value={password}
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e)=>{setPassword(e.target.value)}}
                ></input>

                <input
                    className="signup_name_box"
                    id="name"
                    value={name}
                    placeholder="닉네임"
                    onChange={(e) => setName(e.target.value)}
                ></input>
                
                <input
                    className="signup_date_box"
                    id="age"
                    type="number"
                    value={age}
                    placeholder="나이"
                    onChange={handleAgeChange}
                
                ></input>
                <div className='gender_box'>
                    <h3 className='gender_box_name'>⁃ 성별</h3>
                    <form className='gender_choice' action="action.jsp">
                        <div className='male_choice'><input type="radio" value={gender} onClick={()=>setGender('male')} ></input>남성</div>
                        <div className='male_choice'><input type="radio" value={gender} onClick={()=>setGender('female')}></input>여성</div>
                    </form>
                </div>
                <div className='my_infomation'>
                    <input type="file"
                           id="profileImage"
                           accept="image/*"
                           onChange={handleImageChange}
                           className="my_infomation_wan_btn"
                    />
                    {profileImage && (
                        <img 
                            src={profileImage}
                            alt='프로필 사진'
                            className="preview_mgae"
                        />
                    )}
                </div>
                <button type="submit" className="signup_wan_btn">가입하기</button>
            </form>
        </div>
    </div>
  )
}

export default Signup