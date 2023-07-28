import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import RoomSelection from "./components/RoomSelection";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(
    sessionStorage.getItem("isInChat") === "true"
  );
  const [room, setRoom] = useState(sessionStorage.getItem("selectedRoom") || "");
  const [showSignUpForm, setShowSignUpForm] = useState(
    sessionStorage.getItem("isInSignUp") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isInChat", isInChat);
  }, [isInChat]);

  useEffect(() => {
    sessionStorage.setItem("selectedRoom", room);
  }, [room]);

  // 로그인되지 않은 경우
  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        {showSignUpForm ? (
          <SignUpForm 
          setIsAuth={setIsAuth} 
          setShowSignUpForm={setShowSignUpForm} 
          showSignUpForm={showSignUpForm} 
      />
        ) : (
          <Auth setIsAuth={setIsAuth} setShowSignUpForm={setShowSignUpForm} />
        )}
        {/* 로그인이 안되어 있을 때만 SignUpForm으로 이동할 수 있는 버튼 */}
        {!showSignUpForm && !isInChat && (
          <button onClick={() => setShowSignUpForm(true)}>회원 가입</button>
        )}
      </AppWrapper>
    );
  }

  // 로그인된 경우
  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {isInChat ? (
        <Chat room={room} setIsInChat={setIsInChat} />
      ) : (
        <RoomSelection
          setRoom={setRoom}
          setIsInChat={setIsInChat}
        />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
