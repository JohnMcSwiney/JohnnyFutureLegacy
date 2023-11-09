import React, { useState } from 'react'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { AiFillInstagram, AiFillInfoCircle } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaTelegramPlane } from 'react-icons/fa'
import { Navigate, useNavigate, Link } from "react-router-dom";
//  IoMdCreate BiLogInCircle BiLogOutCircle
import { BsFillCollectionFill } from 'react-icons/bs'
import { MdAccountBox } from 'react-icons/md'
import { IoMdCreate } from 'react-icons/io'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import '../hamburgerMenu/Hamburger.css'
import './style.css'

import UserImgCont from '../EndUserImgCont/UserImgCont'

import { useMyContext } from "../../context/FLContext";
import AppPageContainer from '../containers/AppPageContainer';
//RxHamburgerMenu
export default function SidebarMenu() {

    const { sidebarOpen, setSidebarOpen } = useMyContext();
    const navigate = useNavigate();
    const { userData } = useMyContext();
    const [isOpen, setIsOpen] = useState(sidebarOpen)
    const redirectCollections = () => { navigate(`/browseCollections`); };
    const redirectAccount = () => { navigate(`/profile`); };
    const redirectAbout = () => { navigate(`/about`); };
    const redirectLogin = () => { navigate(`/login`); };
    const redirectLogout = () => { navigate(`/logout`); };
    const redirectUpload = () => { navigate(`/upload`); };

    
    const userImg =
        'https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2FNoPfp.png?alt=media&token=6d1b8c8e-9687-4795-8bbc-9497ca23f26b'
    const userName = 'Username'
    const is_Signedin = false;
    const currentUser = false;
    return (

        <div className={`${sidebarOpen ? 'sidebar--menu open' : 'sidebar--menu small'}`}>

            <div className='menu-items'>
                <div className='user--info--cont'>
                    <UserImgCont imgUrl={userImg} />
                    {sidebarOpen && (
                        <div className='sidebar--user--info'>
                            <h3 className='sidebar--user--type'>User</h3>
                            <h3 className='sidebar--user--name'>{userData ? userData.firstName + " " + userData.lastName : 'Log in'}</h3>
                        </div>
                    )}

                </div>
                {sidebarOpen ? (
                    <div className='sidebar--menu--content--large'>
                        <a onClick={redirectCollections}>
                           <span className='sidebar--menu--icon'><BsFillCollectionFill/></span>Collections</a>
                        <a onClick={redirectAccount}><span className='sidebar--menu--icon'><MdAccountBox/></span> My Account</a>
                        
                        {is_Signedin ?
                            <>
                                <a onClick={redirectUpload}>
                                <span className='sidebar--menu--icon'><IoMdCreate/></span>
                                    Upload</a>
                                    <a onClick={redirectAbout}><span className='sidebar--menu--icon'><AiFillInfoCircle/></span>About</a>

                                <a onClick={redirectLogout}>
                                <span className='sidebar--menu--icon'><BiLogOutCircle/></span>
                                    log out </a>
                            </>

                            :
                            <>
                                <a onClick={redirectUpload}>
                                <span className='sidebar--menu--icon'><IoMdCreate/></span>
                                    Upload</a>
                                    <a onClick={redirectAbout}><span className='sidebar--menu--icon'><AiFillInfoCircle/></span>About</a>

                                <a onClick={redirectLogin}>
                                <span className='sidebar--menu--icon'><BiLogInCircle/></span>
                                    log in</a>
                            </>
                        }

                    </div>
                )
                    :
                    (
                        <div className='sidebar--menu--content--small'>
                        <a onClick={redirectCollections}><BsFillCollectionFill/></a>
                        <a onClick={redirectAccount}><MdAccountBox/></a>
                        
                        {is_Signedin ?
                            <>
                                <a onClick={redirectUpload}>
                                    <IoMdCreate/></a>
                                    <a onClick={redirectAbout}><AiFillInfoCircle/></a>

                                <a onClick={redirectLogout}>
                                    <BiLogOutCircle/></a>
                            </>

                            :
                            <>
                                <a onClick={redirectUpload}>
                                <IoMdCreate/></a>
                                    <a onClick={redirectAbout}><AiFillInfoCircle/></a>

                                <a onClick={redirectLogin}>
                                <BiLogInCircle/></a>
                            </>
                        }

                    </div>
                    )}



                {sidebarOpen && (
                    <div className='sidebar--menu--bottom'>
                        <div className='sidebar--menu--socials--btns'>
                            <button><FaFacebookF /></button>
                            <button><FaTwitter /></button>
                            <button><AiFillInstagram /></button>
                            <button><FaTelegramPlane /></button>
                        </div>
                        <div className='sidebar--copyright'>© 2023 - Future Legacy</div>
                    </div>

                )}

            </div>

        </div>
    )
}
