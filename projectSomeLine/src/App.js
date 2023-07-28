import logo from './logo.svg';
import './App.css';

// import Baenner from './components/Baenner';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatBox from './components/ChatBox';
// import Baenner from './components/Baenner';
import ChatList from './components/ChatList';
import Matching from './components/Matching';
import SideMenu from './components/SideMenu';

import { Route, Routes, useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();
  const showSideMenu = location.pathname === '/chatbox' || location.pathname === '/chatlist';

  return (
    <div className="body">
      <Header/>
      {/* <Baenner/> */}

      {showSideMenu && <SideMenu/>}

      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/chatbox' element={<ChatBox/>}></Route>
        <Route path='/chatlist' element={<ChatList/>}></Route>
        <Route path='/matching' element={<Matching/>}></Route>
      </Routes>

      {/* <Footer/> */}
    </div>
  );
}

export default App;
