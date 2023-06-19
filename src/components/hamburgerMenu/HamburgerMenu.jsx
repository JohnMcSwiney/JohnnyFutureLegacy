import React, { useState } from 'react'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { AiFillInstagram } from 'react-icons/ai'
import {FaFacebookF, FaTwitter,FaTelegramPlane} from 'react-icons/fa'

import './Hamburger.css'

import UserImgCont from '../EndUserImgCont/UserImgCont'

//RxHamburgerMenu
export default function HamburgerMenu () {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const userImg =
    'https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2FGroup%20981.png?alt=media&token=2f015450-3861-4fd8-ad03-53efc94fde68'
  const userName = 'Garret Morrow'
  return (
    <>
      <button className='menu-button' onClick={toggleMenu}>
        {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>
      <div className={`${isOpen ? 'menu open' : 'menu'}`}>
        {isOpen && (
          <div className='menu-items'>
            <div className='user--info--cont'>
              <UserImgCont imgUrl={userImg} />
              <div className='user--info'> 
                <h3 className='user--type'>User</h3>
                <h3 className='user--name'>{userName}</h3>
              </div>
            </div>

            <div className='FL--menu--content'>
              <a>Subscribe</a>
              <a>Connect</a>
              <a>Browse</a>
            </div>

            <div className='FL--menu--bottom'>
                    <div className='FL--menu--socials--btns'>
                        <button><FaFacebookF/></button>
                        <button><FaTwitter/></button>
                        <button><AiFillInstagram/></button>
                        <button><FaTelegramPlane/></button>
                    </div>
                <div className='FL--copyright'>© 2023 - Future Legacy</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
