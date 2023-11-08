import React from 'react'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { useMyContext } from "../../context/FLContext";
import './style.css'
function SideBarBtn() {
    const { sidebarOpen, setSidebarOpen } = useMyContext();
    const toggleMenu = () => {
        setSidebarOpen(!sidebarOpen)
    }
    return (
            <button className='sidebar--menu-button' onClick={toggleMenu}>
                <RxHamburgerMenu />
            </button>
    )
}

export default SideBarBtn