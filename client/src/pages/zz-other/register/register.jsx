import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './styles.css'
import PageContainer from '../../../components/containers/PageContainer';
import AppContentWrapper from '../../../components/containers/AppContentWrapper';
import PageTitle from '../../../components/containers/PageTitle';
import { StyledContainer_v2 } from '../../../components/Styles';
import API_BASE_URL from '../../../apiConfig';

function Register() {

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const userRef = useRef();
    const errRef = useRef();

    // const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const firstNameRef = useRef();

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const lastNameRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const emailRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [subTier, setSubTier] = useState(0); // Default value set to 0
    const [isInstit, setIsInstit] = useState(false); // Default value set to false
    const [subTierFocus, setSubTierFocus] = useState(false);
    const [isInstitFocus, setIsInstitFocus] = useState(false);

    const subTierRef = useRef();
    const isInstitRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    // useEffect(() => {
    //     const result = USER_REGEX.test(username);
    //     console.log(result);
    //     console.log(username);
    //     setValidUsername(result);
    // }, [username])

    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

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
    }, [
        // username,
         pwd, matchPwd, email, firstName, lastName]);

    const handleRedirectLogin = () => {

        navigate(`/login`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        // const isValidUsername = USER_REGEX.test(username);
        const isValidPwd = PWD_REGEX.test(pwd);
        const isValidEmail = EMAIL_REGEX.test(email);
        const isValidFirstName = USER_REGEX.test(firstName);
        const isValidLastName = USER_REGEX.test(lastName);


        if (!isValidPwd || !isValidEmail || !isValidFirstName || !isValidLastName) {
            setErrMsg('Invalid Entry');
            return;
        }
        let password = pwd;
        // Prepare the data to be sent to the backend
        let username = firstName + '_' + lastName;
        const userData = {
            username,
            password,
            firstName,
            lastName,
            email,
            subTier,
            isInstit,

        };
        console.log(userData)
        try {
            // Assuming you have an API endpoint for user registration
            const response = await fetch(`${API_BASE_URL}/api/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Handle success (e.g., redirect to login page)
                setSuccess(true);
            } else {
                // Handle error response from the backend
                const errorData = await response.json();
                setErrMsg(errorData.error || 'Error during registration');
            }
        } catch (error) {
            // Handle network or unexpected errors
            setErrMsg('Error during registration');
        }
    };
    return (
        <AppContentWrapper>
            <PageContainer>
                {success ? (
                    <div>
                        <h1>Success!</h1>
                        <a className="register--link" onClick={handleRedirectLogin}>Login</a>
                    </div>
                ) : (
                    <div className='register--content--cont'>
                        <p ref={errRef}
                            className={errMsg ? "errMsg" : "offscreen"}
                            aria-live="assertive">
                            {errMsg}
                        </p>
                        {/* <PageTitle>  */}
                        <h1>Register User</h1>
                        <p>For testing only</p>
                        {/* </PageTitle> */}
                        <form onSubmit={handleSubmit}>

                            <section className='fir--las--name--input'>
                                {/* First Name */}
                                <div className='input--cont--name'>
                                    <aside
                                        id="firstNamenote"
                                        className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}
                                    >
                                        <AiOutlineInfoCircle />
                                        4 to 24 characters. <br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </aside>
                                    <section className='FL_Input__text__2'>
                                        <label htmlFor="firstName">
                                            First Name:
                                            <span className={validFirstName ? 'valid' : 'hide'}>
                                                <FaCheck />
                                            </span>
                                            <span className={validFirstName || !firstName ? 'hide' : 'invalid'}>
                                                <FaTimes />
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            ref={firstNameRef}
                                            autoComplete='off'
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            aria-invalid={validFirstName ? "false" : "true"}
                                            aria-describedby="firstNamenote"
                                            onFocus={() => setFirstNameFocus(true)}
                                            onBlur={() => setFirstNameFocus(false)}
                                        />
                                    </section>
                                </div>

                                {/* Last Name */}
                                <div className='input--cont--name'>
                                    <aside
                                        id="lastNamenote"
                                        className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}
                                    >
                                        <AiOutlineInfoCircle />
                                        4 to 24 characters. <br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </aside>
                                    <section className='FL_Input__text__2'>
                                        <label htmlFor="lastName">
                                            Last Name:
                                            <span className={validLastName ? 'valid' : 'hide'}>
                                                <FaCheck />
                                            </span>
                                            <span className={validLastName || !lastName ? 'hide' : 'invalid'}>
                                                <FaTimes />
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            ref={lastNameRef}
                                            autoComplete='off'
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            aria-invalid={validLastName ? "false" : "true"}
                                            aria-describedby="lastNamenote"
                                            onFocus={() => setLastNameFocus(true)}
                                            onBlur={() => setLastNameFocus(false)}
                                        />
                                    </section>
                                </div>

                            </section>

                            <div className='input--cont'>{/* Email */}
                                <aside
                                    id="emailnote"
                                    className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}
                                >
                                    <AiOutlineInfoCircle />
                                    Enter a valid email address.
                                </aside>
                                <section className='FL_Input__text__1'>
                                    <label htmlFor="email">
                                        Email:
                                        <span className={validEmail ? 'valid' : 'hide'}>
                                            <FaCheck />
                                        </span>
                                        <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                            <FaTimes />
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        ref={emailRef}
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                </section>
                            </div>{/* Email/ */}
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

                            {/* Sub Tier */}
                            <section className='fir--las--name--input'>
                                <div className='sub--input--cont'>
                                    <aside
                                        id="subTiernote"
                                        className={subTierFocus ? "instructions" : "offscreen"}
                                    >
                                        <AiOutlineInfoCircle />
                                        Your custom instructions for Sub Tier here.
                                    </aside>
                                    <label htmlFor="subTier">
                                        Sub Tier:
                                        <input
                                            type="number"
                                            id="subTier"
                                            ref={subTierRef}
                                            autoComplete='off'
                                            value={subTier}
                                            onChange={(e) => setSubTier(Number(e.target.value))}
                                            required
                                            aria-describedby="subTiernote"
                                            onFocus={() => setSubTierFocus(true)}
                                            onBlur={() => setSubTierFocus(false)}
                                            min={0}
                                            max={3}
                                        />


                                    </label>
                                    <div className='subTier--info--cont'>
                                        <p>0 none</p>
                                        <p>1 educational</p>
                                        <p>2 editorial</p>
                                        <p>3 commercial</p>
                                    </div>
                                </div>

                                {/* Is Institution */}
                                <div className='input--cont'>
                                    <aside
                                        id="isInstitnote"
                                        className={isInstitFocus ? "instructions" : "offscreen"}
                                    >
                                        <AiOutlineInfoCircle />
                                        Your custom instructions for Is Institution here.
                                    </aside>
                                    <section className='FL_Input_check'>
                                        <label htmlFor="isInstit">
                                            Is Institution:
                                            <input
                                                type="checkbox"
                                                id="isInstit"
                                                ref={isInstitRef}
                                                checked={isInstit}
                                                onChange={() => setIsInstit(!isInstit)}
                                                aria-describedby="isInstitnote"
                                                onFocus={() => setIsInstitFocus(true)}
                                                onBlur={() => setIsInstitFocus(false)}
                                            />
                                        </label>
                                    </section>
                                </div>
                            </section>


                            <div>
                                <button disabled={!validFirstName ||
                                    !validLastName ||
                                    !validEmail ||
                                    !validPwd ||
                                    !validMatch
                                    ? true : false}>Sign Up</button>
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

// unused things
{/* UserName */ }
{/* <div className='input--cont'>
                                <aside id="uidnote"
                                    className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                    <AiOutlineInfoCircle />
                                    4 to 24 characters. <br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </aside>
                                <section className='FL_Input__text__1'>
                                    <label htmlFor="username">
                                        Username:
                                        <span className={validUsername ? 'valid' : 'hide'}>
                                            <FaCheck />
                                        </span>
                                        <span className={validUsername || !username ? 'hide' : 'invalid'}>
                                            <FaTimes />
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        aria-invalid={validUsername ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                </section>
                            </div> */}
{/* UserName/ */ }