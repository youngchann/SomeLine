import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase-config";
import "../styles/SignUpForm.css";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage"
import {v4} from 'uuid'

const SignUpForm = ({ setIsInSignUp, setShowSignUpForm, showSignUpForm }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const usersRef = collection(db, "users");

  
  useEffect(() => {
    sessionStorage.setItem("isInSignUp", showSignUpForm ? "true" : "false");
  }, [showSignUpForm]);
  
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
    uploadBytes(imageRef, profileImage).then(()=>{
        alert("Image Up")
    })
    if (isFormValid()) {
        // 여기서 Firebase에 데이터를 보내는 로직을 작성하세요.
        await addDoc(usersRef, {
            id : id,
            pw : password,
            name : name,
            gender : gender,
            age : age
          });
  
        // 회원가입이 완료되면 회원가입 프로세스를 종료하고 로그인 화면으로 돌아감
        setShowSignUpForm(false);
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
      id.trim() !== "" &&
      password.trim() !== "" &&
      name.trim() !== "" &&
      gender.trim() !== "" &&
      age > 0 &&
      profileImage !== null
    );
  };

  const handleBackToLogin = () => {
    setShowSignUpForm(false);
    sessionStorage.setItem("isInSignUp", "false")
  };

  return (
    <div className="sign-up-form">
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileImage">프로필 사진</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="프로필 미리보기"
              className="preview-image"
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
            <label htmlFor="gender">성별</label>
            <div className="gender-buttons">
                <button
                    type="button"
                    className={gender === "남자" ? "active" : ""}
                    onClick={() => setGender("남자")}
                >
                    남자
                </button>
                <button
                    type="button"
                    className={gender === "여자" ? "active" : ""}
                    onClick={() => setGender("여자")}
                >
                    여자
                </button>
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">나이</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" disabled={!isFormValid()}>
            회원 가입
          </button>
          <button type="button" onClick={handleBackToLogin}>
            로그인 화면으로 돌아가기
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
