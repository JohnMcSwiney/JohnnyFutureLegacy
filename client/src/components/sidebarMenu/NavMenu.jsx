import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'

import { useMyContext } from "../../context/FLContext";

import UserProfilePicture from '../profilePicture/UserProfilePicture';

import { BsFillCollectionFill } from 'react-icons/bs'
import { MdAccountBox } from 'react-icons/md'
import { IoMdCreate } from 'react-icons/io'
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi'
import { FaUsers } from "react-icons/fa6";
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { AiFillInstagram, AiFillInfoCircle } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaTelegramPlane } from 'react-icons/fa'
import { RiHome3Fill } from "react-icons/ri";

import './navStyle.css'

function NavMenu() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { sidebarOpen, setSidebarOpen } = useMyContext();
    const navigate = useNavigate();
    const { userData, currentUserObject } = useMyContext();

    // Routes
    const redirectHome = () => { navigate(`/`); };
    const redirectClients = () => { navigate(`/clients`); };
    const redirectAccount = () => { navigate(`/profile`); };
    const redirectAbout = () => { navigate(`/about`); };
    const redirectLogin = () => { navigate(`/login`); };
    const redirectLogout = () => { navigate(`/logout`); };
    const redirectUpload = () => { navigate(`/upload`); };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    // Define your breakpoint for swapping components

    const breakpoint = 480; // Adjust this value based on your needs

    return (
        <div className='nav--menu--cont'>
            {windowWidth < breakpoint ? (
                <MobileNav />
            ) : (
                <DesktopNav />
            )}
        </div>
    );
};

const MobileNav = () => {
    const navigate = useNavigate();
    const { userData, currentUserObject } = useMyContext();


    // Routes
    const redirectHome = () => { navigate(`/`); };
    const redirectClients = () => { navigate(`/clients`); };
    const redirectAccount = () => { navigate(`/profile`); };
    const redirectLogin = () => { navigate(`/login`); };

    const is_Signedin = true;
    return <div className='nav--menu--cont'>
        <div className='mobile--nav--menu'>
            <div className='mobile--nav--links'>

                <a onClick={redirectHome}>
                    <RiHome3Fill className='nav--menu--icon--mobile' />
                    Home
                </a>
                <a onClick={redirectClients}>
                    {/* <span className='nav--menu--icon--mobile'><FaUsers /></span> */}
                    <FaUsers className='nav--menu--icon--mobile' />
                    Clients
                </a>
                <a onClick={redirectLogin}>
                    <BiLogInCircle className='nav--menu--icon--mobile' />
                    Login
                </a>
                {currentUserObject &&
                    <a className='nav--user'
                        onClick={redirectAccount}
                        data-tooltip-id="tip_open_profile"
                        data-tooltip-content={`Your Profile`}
                        data-tooltip-place="right">
                        <UserProfilePicture currentUserObject={currentUserObject} size={2} />
                    </a>
                }

            </div>
        </div>

    </div>;
};


const DesktopNav = () => {
    const { sidebarOpen, setSidebarOpen } = useMyContext();

    const navigate = useNavigate();
    const { userData, currentUserObject } = useMyContext();


    // Routes
    const redirectHome = () => { navigate(`/`); };
    const redirectClients = () => { navigate(`/clients`); };
    const redirectAccount = () => { navigate(`/profile`); };
    const redirectAbout = () => { navigate(`/about`); };
    const redirectLogin = () => { navigate(`/login`); };
    const redirectLogout = () => { navigate(`/logout`); };
    const redirectUpload = () => { navigate(`/upload`); };

    const is_Signedin = true;

    return <div className={`${sidebarOpen ? 'desktop--nav open--nav' : 'desktop--nav closed--nav'}`}>

        <div className='nav--user--cont'
            onClick={redirectAccount}
            data-tooltip-id="tip_open_profile"
            data-tooltip-content={`Your Profile`}
            data-tooltip-place="right"
        >
            {/* <UserImgCont imgUrl={userImg} /> */}
            {currentUserObject &&
                <div className='nav--user'>
                    <UserProfilePicture currentUserObject={currentUserObject} size={2} />
                    {sidebarOpen && (
                        <div className='nav--user--info'>
                            <h3 className='nav--user--type'>Test User</h3>
                            <h3 className='nav--user--name'>{currentUserObject.firstName}</h3>
                        </div>
                    )}
                </div>
            }
        </div>


        {sidebarOpen ?
            (
                <div className='desktop--nav--links'>

                    <a onClick={redirectClients}>
                        <span className='nav--menu--icon'><FaUsers /></span>Clients
                    </a>

                    <a onClick={redirectUpload}>
                        <span className='nav--menu--icon'><IoMdCreate /></span>
                        Upload
                    </a>

                    <a onClick={redirectAbout}>
                        <span className='nav--menu--icon'><AiFillInfoCircle /></span>About
                    </a>


                </div>
            ) :

            (
                <div className='desktop--nav--links'>
                    <a onClick={redirectClients}
                        data-tooltip-id="tip_open_Clients"
                        data-tooltip-content={`Browse Clients`}
                        data-tooltip-place="right"
                    ><span className='nav--menu--icon'><FaUsers /></span></a>

                    <a onClick={redirectUpload}
                        data-tooltip-id="tip_open_upload"
                        data-tooltip-content={`Upload Content`}
                        data-tooltip-place="right">
                        <span className='nav--menu--icon'><IoMdCreate /></span></a>

                    <a onClick={redirectAbout}
                        data-tooltip-id="tip_open_about"
                        data-tooltip-content={`Our Story`}
                        data-tooltip-place="right">
                        <span className='nav--menu--icon'><AiFillInfoCircle /></span></a>


                </div>
            )

        }

        {/* implement Checks for user */}
        {sidebarOpen ?

            (
                <div className='desktop--nav--links'>
                    <a onClick={redirectLogin}>
                        <span className='nav--menu--icon'><BiLogInCircle /></span>Login
                    </a>
                </div>
            ) :

            (
                <div className='desktop--nav--links'>
                    <a onClick={redirectLogin}
                        data-tooltip-id="tip_open_logout"
                        data-tooltip-content={`Logout`}
                        data-tooltip-place="right">
                        <span className='nav--menu--icon'><BiLogInCircle /></span></a>
                </div>
            )

        }
    </div>;
};


export default NavMenu