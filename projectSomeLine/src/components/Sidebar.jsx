import React, {useEffect, useRef, useState } from "react";


const Sidebar = ({ width=200, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();
  
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };
  
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async e => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width); 
      await setOpen(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })


  return (
    <div className="sidebar_container">
      <div ref={side}  className="sidebar_sidebar" style={{ width: `${width}px`, height: '400px',  transform: `translatex(${-xPosition}px)`}}>
          <button onClick={() => toggleMenu()}
          className="sidebar_button" >
            {isOpen ? 
            <span>X</span> : <span>0</span>
            }
          </button>
        <div className="sidebar_content">{children}</div>
      </div>
    </div>
  );
};


export default Sidebar;