import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className='side_menu_background'>
        <div className='side_menu_box'>
            <ul className='side_menu_list'>
<<<<<<< HEAD
                <Link to='/matching' className='side_menus_menu matching'>
=======
                <Link to='/matching' className='side_menus_menu menu11'>    
>>>>>>> fbeeebe (7.31.19.lee)
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    매칭</Link>
                <Link to='/chatlist' className='side_menus_menu chatlist'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    채팅</Link>
                <Link to='/chatbox' className='side_menus_menu chatbot'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    챗봇</Link>
                <Link to='/profile' className='side_menus_menu chatbot'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    프로필</Link>
            </ul>
        </div>
    </div>
  )
}

export default SideMenu