import React, { useState } from 'react'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { AiFillInstagram } from 'react-icons/ai'
import {FaFacebookF, FaTwitter,FaTelegramPlane} from 'react-icons/fa'
import { Navigate, useNavigate, Link } from "react-router-dom";

import './Hamburger.css'

import UserImgCont from '../EndUserImgCont/UserImgCont'

import {useMyContext} from "../../context/FLContext";
//RxHamburgerMenu
export default function HamburgerMenu () {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();
  const {userData} = useMyContext();

  const redirectCollections = () => {navigate(`/collections`); toggleMenu();};
  const redirectAccount = () => {navigate(`/profile`); toggleMenu();};
  const redirectAbout = () => {navigate(`/about`); toggleMenu();};
  const redirectLogin = () => {navigate(`/login`); toggleMenu();};
  const redirectLogout = () => {navigate(`/logout`); toggleMenu();};


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  const userImg =
    'https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2FNoPfp.png?alt=media&token=6d1b8c8e-9687-4795-8bbc-9497ca23f26b'
  const userName = 'Username'
  const is_Signedin = false;
  const currentUser = false;
  return (
    <>
      <div className='menu-button--cont'>
        <button className='menu-button' onClick={toggleMenu}>
          {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>
      </div>
      
      <div className={`${isOpen ? 'menu open' : 'menu'}`}>
        {isOpen && (
          <div className='menu-items'>
            <div className='user--info--cont'>
              <UserImgCont imgUrl={userImg} />
              <div className='user--info'> 
                <h3 className='user--type'>User</h3>
                <h3 className='user--name'>{userData ? userData.firstName + " " + userData.lastName : 'Log in'}</h3>
              </div>
            </div>

            <div className='FL--menu--content'>
              <a onClick={redirectCollections}>Collections</a>
              <a onClick={redirectAccount}>My Account</a>
              <a onClick={redirectAbout}>About</a>
              {is_Signedin ? 
                <a onClick={redirectLogout}>
                log out </a>
                :
                <a onClick={redirectLogin}>
                  log in</a>}
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
