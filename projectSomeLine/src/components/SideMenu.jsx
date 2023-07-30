import React from 'react'

const SideMenu = () => {
  return (
    <div className='side_menu_bg'>
        <div className='side_menu_box'>
            <ul className='side_menu_list'>
                <a href="#" className='side_menus_menu menu11'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    매칭</a>
                <a href="#" className='side_menus_menu menu22'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    채팅</a>
                <a href="#" className='side_menus_menu menu33'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    설정</a>
            </ul>
        </div>
    </div>
  )
}

export default SideMenu