import React, {useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";


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
            {/* <button onClick={() => toggleMenu()}
            className="sidebar_button" >
            {isOpen ? 
            <span className="sidebar_button_text">X</span> : <span className="sidebar_button_text">{"<"}</span>
            }
            </button> */}
            {isOpen ?
            <button onClick={() => toggleMenu()} className="sidebar_button sidebar_button_close" ><span className="sidebar_button_text">X</span></button>:
            <button onClick={() => toggleMenu()} className="sidebar_button" ><span className="sidebar_button_text">{"<"}</span></button>
            }

        <div className="sidebar_content">{children}</div>
        </div>
        <div className="sidebar_secret_container">
            <SideMenu/>
        </div>
    </div>
  );
};


export default Sidebar;