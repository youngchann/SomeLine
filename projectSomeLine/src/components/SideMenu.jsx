import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className='side_menu_background'>
        <div className='side_menu_box'>
            <ul className='side_menu_list'>
                <Link to='/matching' className='side_menus_menu menu11'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    매칭</Link>
                <Link to='/chatlist' className='side_menus_menu menu22'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    채팅 리스트</Link>
                <Link to='/chatbox' className='side_menus_menu menu33'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    챗봇</Link>
            </ul>
        </div>
    </div>
  )
}

export default SideMenu