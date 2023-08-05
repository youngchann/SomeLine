import React, { useState } from "react";
import { db, storage, auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
    const nav = useNavigate()

    const [imageUpload, setImageUpload] = useState(null);
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageUpload(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setProfileImage(reader.result);
          console.log("Profile Image set:", reader.result);
        };
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!isFormValid()) {
            alert("모든 필수 정보를 입력해주세요.");
            return;
        }
    
        const imageRef = ref(storage, `images/${name+v4()}`);
        await uploadBytes(imageRef, imageUpload);
        const downloadUrl = await getDownloadURL(imageRef);
    
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, {
                displayName: name,
                photoURL: downloadUrl,
            });
            await addDoc(usersRef, {
                id : email,
                pw : password,
                name : name,
                gender : gender,
                age : age,
                profileUrl : downloadUrl,
                createdAt: serverTimestamp()
            });
    
            // 회원가입이 완료되면 회원가입 프로세스를 종료하고 로그인 화면으로 돌아감
            signOut(auth);
            console.log(`res: ${res}`);
            console.log(`res.user: ${res.user}`);
            nav('/');
        } catch (error) {
            console.error(error);
            alert("회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.");
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
    return email && password && name && gender && age && imageUpload;} 
    

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
                    maxLength={6}
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
                    <div className="preview_mgae_box">
                        {profileImage && (
                            <img 
                                src={profileImage}
                                alt='프로필 사진'
                                className="preview_mgae"
                                style={{width:50}}
                            />
                        )}
                    </div>
                </div>
                <button type="submit" className="signup_wan_btn">가입하기</button>
            </form>
        </div>
    </div>
  )
}

export default Signup