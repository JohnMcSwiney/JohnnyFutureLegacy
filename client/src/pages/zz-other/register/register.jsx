import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './styles.css'
import PageContainer from '../../../components/containers/PageContainer';
import AppContentWrapper from '../../../components/containers/AppContentWrapper';
import PageTitle from '../../../components/containers/PageTitle';


function Register() {

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;;


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    const handleRedirectLogin = () => {

        navigate(`/login`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //button enabled with js hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('invalid Entry');
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    }
    return (
        <AppContentWrapper>
            <PageContainer>
                {success ? (
                    <div>
                        <h1>Success!</h1>
                        <a className="register--link" onClick={handleRedirectLogin}>Login</a>
                    </div>
                ) : (
                    <div>
                        <p ref={errRef}
                            className={errMsg ? "errMsg" : "offscreen"}
                            aria-live="assertive">
                            {errMsg}
                        </p>
                        <PageTitle>
                            <h1>Register</h1>
                        </PageTitle>
                        <form onSubmit={handleSubmit}>
                            <div className='input--cont'>{/* UserName */}
                                <aside id="uidnote"
                                    className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <AiOutlineInfoCircle />
                                    4 to 24 characters. <br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </aside>
                                <section className='FL_Input__text__1'>
                                    <label htmlFor="username">
                                        Username:
                                        <span className={validName ? 'valid' : 'hide'}>
                                            <FaCheck />
                                        </span>
                                        <span className={validName || !user ? 'hide' : 'invalid'}>
                                            <FaTimes />
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setUser(e.target.value)}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                </section>
                            </div>{/* UserName/ */}
                            <div className='input--cont'>{/* Password */}
                                <aside id="pwdnote"
                                    className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <AiOutlineInfoCircle />
                                    8 to 24 characters.
                                    Must include uppercase & lowercase letters, a number, & a special character.<br />
                                    <div className='special--chars'>
                                        Allowed special characters:
                                        <span aria-label="exclamation mark">!</span>
                                        <span aria-label="at symbol">@</span>
                                        <span aria-label="hashtag">#</span>
                                        <span aria-label="dollar sign">$</span>
                                        <span aria-label="percent">%</span>
                                    </div>

                                </aside>
                                <section className='FL_Input__text__1'>
                                    <label htmlFor="password">
                                        Password:
                                        <span className={validPwd ? 'valid' : 'hide'}>
                                            <FaCheck />
                                        </span>
                                        <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                            <FaTimes />
                                        </span>
                                    </label>

                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />

                                </section>

                            </div>{/* Password/ */}
                            <div className='input--cont'>{/* Password Match */}
                                <aside id="confirmnote"
                                    className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <AiOutlineInfoCircle />
                                    Must match the first password input field.
                                </aside>
                                <section className='FL_Input__text__1'>
                                    <label htmlFor="confirm_pwd">
                                        Confirm Password:
                                        <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                            <FaCheck />
                                        </span>
                                        <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                                            <FaTimes />
                                        </span>
                                    </label>

                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />

                                </section>

                            </div>{/* Password Match/ */}
                            <div>
                                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                            </div>
                            <div>
                                Already registered?<br />
                                <a className="register--link" onClick={handleRedirectLogin}>Login</a>
                            </div>

                        </form>

                    </div>
                )}
            </PageContainer>
        </AppContentWrapper>
    )
}

export default Register;