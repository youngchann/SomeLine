import React from 'react'


// 주석처리된 것들은 메뉴입니다. 필요시 다시 재 생성하기 위해, 주석처리 하였습니다.
// 다만 프로젝트가 종료될 시까지 사용 안 할 시 마무리에 삭제하려고 합니다. -작업자 : 이찬용

const Header = () => {
    // const menuItems = ['Menu1', 'Menu2', 'Menu3', 'Menu4'];

    return (
        <header className='top'>
            <div className='top_logo'>
                <a href="#" className='top_logo_text'>SOME.LINE</a>
            </div>
            <ul className='top_nav'>
                {/* {menuItems.map((menuItem, index) => (
                    <li key={index} className='list_Style menuicon'>
                        <a href="#">{menuItem}</a>
                    </li>
                ))} */}
                {/* <li className='list_Style'>
                    <a href="#" className='nav_login_btn'>Login</a>
                </li> */}
                <li className='list_Style'>
                    <a href="#" className='nav_login_btn'>Sign up</a>
                </li>
            </ul>
        </header>
    )
}

export default Header;