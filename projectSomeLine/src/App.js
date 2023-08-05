import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatBox from './components/ChatBox';
import ChatList from './components/ChatList';
import Matching from './components/Matching';
import SideMenu from './components/SideMenu';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';

import Loading from './components/Loading';
import Tendency from './components/Tendency';


import { Route, Routes, useLocation, Navigate } from 'react-router-dom';




function App() {

  const location = useLocation();
  const showSideMenu = location.pathname === '/chatbox' || location.pathname === '/chatlist' || location.pathname === '/matching' || location.pathname === '/profile';


  return (
    <div className="body">
      <Header/>

      {showSideMenu && <Sidebar><SideMenu/></Sidebar>}

      {/* <Sidebar><SideMenu/></Sidebar> */}

      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/chatbox' element={<ChatBox/>}></Route>
        <Route path='/chatlist' element={<ChatList/>}></Route>
        <Route path='/matching' element={<Matching/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        {/* 테스트용 */}
        <Route path='/loading' element={<Loading/>}></Route>
        <Route path='/tendency' element={<Tendency/>}></Route>
      </Routes>

      {/* <Footer/> */}
    </div>
  );
}

export default App;