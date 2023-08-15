import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='side_menu_background'>
      <div className='side_menu_box'>
        <ul className='side_menu_list'>
          <Link to='/matching' className='side_menus_menu matching'>
            {isMobile ? <span className="icon">💞</span> : <span className="text">매칭</span>}
          </Link>
          <Link to='/chatlist' className='side_menus_menu chatlist'>
            {isMobile ? <span className="icon">💬</span> : <span className="text">대화방</span>}
          </Link>
          <Link to='/community' className='side_menus_menu chatbot'>
            {isMobile ? <span className="icon">🎭🗯</span> : <span className="text">커뮤니티</span>}
          </Link>
          <Link to='/profile' className='side_menus_menu chatbot'>
            {isMobile ? <span className="icon">⚙️</span> : <span className="text">프로필</span>}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;