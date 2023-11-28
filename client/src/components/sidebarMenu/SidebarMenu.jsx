import React, { useState, useEffect } from 'react'
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
import { Tooltip } from 'react-tooltip'
import { FaUsers } from "react-icons/fa6";
//RxHamburgerMenu
export default function SidebarMenu() {

    const { sidebarOpen, setSidebarOpen } = useMyContext();
    const navigate = useNavigate();
    const { userData } = useMyContext();
    const [isOpen, setIsOpen] = useState(sidebarOpen)
    const redirectClients = () => { navigate(`/clients`); };
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

        <div className={`${sidebarOpen ? 'sidebar--menu open' : 'sidebar--menu small'}`}
        // onClick={}
        >

            <div className='menu-items'>
                <Tooltip id="tip_open_Clients" />
                <Tooltip id="tip_open_profile" />
                <Tooltip id="tip_open_upload" />
                <Tooltip id="tip_open_about" />
                <Tooltip id="tip_open_logout" />
                <div className='user--info--cont' 
                onClick={redirectAccount}
                data-tooltip-id="tip_open_profile"
                data-tooltip-content={`Your Profile`}
                data-tooltip-place="right"
                >
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




                        {is_Signedin ?
                            <>
                                <a onClick={redirectClients}
                                    data-tooltip-id="tip_open_Clients"
                                    data-tooltip-content={`Browse Clients`}
                                    data-tooltip-place="right"
                                >

                                    <span className='sidebar--menu--icon'>
                                        {/* <BsFillCollectionFill /> */}
                                        <FaUsers />
                                        </span>Clients
                                </a>
                                {/* <a onClick={redirectAccount}
                                    data-tooltip-id="tip_open_profile"
                                    data-tooltip-content={`Your Profile`}
                                    data-tooltip-place="right"
                                >
                                    <span className='sidebar--menu--icon'><MdAccountBox /></span> Profile</a> */}

                                <a onClick={redirectUpload}
                                    data-tooltip-id="tip_open_upload"
                                    data-tooltip-content={`Upload Content`}
                                    data-tooltip-place="right">
                                    <span className='sidebar--menu--icon'><IoMdCreate /></span>
                                    Upload</a>

                                <a onClick={redirectAbout}
                                    data-tooltip-id="tip_open_about"
                                    data-tooltip-content={`Our Story`}
                                    data-tooltip-place="right">
                                    <span className='sidebar--menu--icon'><AiFillInfoCircle /></span>About</a>

                                <a onClick={redirectLogout}
                                    data-tooltip-id="tip_open_logout"
                                    data-tooltip-content={`Logout`}
                                    data-tooltip-place="right">
                                    <span className='sidebar--menu--icon'><BiLogOutCircle /></span>
                                    log out </a>
                            </>

                            :
                            <>
                                <a onClick={redirectClients}
                                    data-tooltip-id="tip_open_Clients"
                                    data-tooltip-content={`Browse Clients`}
                                    data-tooltip-place="right"
                                >

                                    <span className='sidebar--menu--icon'>
                                        {/* <BsFillCollectionFill /> */}
                                        <FaUsers />
                                        </span>Clients
                                </a>
                                {/* <a onClick={redirectAccount}
                                    data-tooltip-id="tip_open_profile"
                                    data-tooltip-content={`Your Profile`}
                                    data-tooltip-place="right"
                                >
                                    <span className='sidebar--menu--icon'><MdAccountBox /></span> Profile</a> */}

                                <a onClick={redirectUpload}
                                    data-tooltip-id="tip_open_upload"
                                    data-tooltip-content={`Upload Content`}
                                    data-tooltip-place="right">

                                    <span className='sidebar--menu--icon'><IoMdCreate /></span>
                                    Upload</a>
                                <a onClick={redirectAbout}
                                    data-tooltip-id="tip_open_about"
                                    data-tooltip-content={`Our Story`}
                                    data-tooltip-place="right">

                                    <span className='sidebar--menu--icon'><AiFillInfoCircle /></span>About</a>

                                <a onClick={redirectLogin}
                                    data-tooltip-id="tip_open_logout"
                                    data-tooltip-content={`Login`}
                                    data-tooltip-place="right">
                                    <span className='sidebar--menu--icon'><BiLogInCircle /></span>
                                    log in</a>
                            </>
                        }

                    </div>
                )
                    :
                    (
                        <div className='sidebar--menu--content--small'>
                            <Tooltip id="tip_closed_Clients" />
                            <Tooltip id="tip_closed_profile" />
                            <a onClick={redirectClients}
                                data-tooltip-id="tip_closed_Clients"
                                data-tooltip-content={`Browse Clients`}
                                data-tooltip-place="right"
                            >
                                {/* <BsFillCollectionFill /> */}
                                <FaUsers />
                                </a>
                            {/* <a onClick={redirectAccount}
                                data-tooltip-id="tip_closed_profile"
                                data-tooltip-content={`Your Profile`}
                                data-tooltip-place="right"
                            ><MdAccountBox /></a> */}

                            {is_Signedin ?
                                <>
                                    <a onClick={redirectUpload}
                                        data-tooltip-id="tip_open_upload"
                                        data-tooltip-content={`Upload Content`}
                                        data-tooltip-place="right">
                                        <IoMdCreate /></a>
                                    <a onClick={redirectAbout}
                                        data-tooltip-id="tip_open_about"
                                        data-tooltip-content={`Our Story`}
                                        data-tooltip-place="right"><AiFillInfoCircle /></a>

                                    <a onClick={redirectLogout}
                                        data-tooltip-id="tip_open_logout"
                                        data-tooltip-content={`Logout`}
                                        data-tooltip-place="right">
                                        <BiLogOutCircle /></a>
                                </>

                                :
                                <>
                                    <a onClick={redirectUpload}
                                        data-tooltip-id="tip_open_upload"
                                        data-tooltip-content={`Upload Content`}
                                        data-tooltip-place="right">
                                        <IoMdCreate /></a>
                                    <a onClick={redirectAbout}
                                        data-tooltip-id="tip_open_about"
                                        data-tooltip-content={`Our Story`}
                                        data-tooltip-place="right"><AiFillInfoCircle /></a>

                                    <a onClick={redirectLogin}
                                        data-tooltip-id="tip_open_logout"
                                        data-tooltip-content={`Login`}
                                        data-tooltip-place="right">
                                        <BiLogInCircle /></a>
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
