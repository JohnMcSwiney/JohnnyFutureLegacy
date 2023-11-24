import React from 'react'

function ProfileRedirect({onConfirm, onCancel}) {
    return (

        <div className="asset--popup-container">
            <div className="asset--popup">
                <a>PURCHASE SUCCESSFUL!</a>
                <h2></h2>
                <p className='popup--text'>
                The Asset has been licensed to your account, you can view it in your profile
                </p>
                <div className='asset--popup--btns'>

                    <button className='popup--btn btn--primary' onClick={onConfirm}>Go to Profile</button>

                    <button className='popup--btn btn--secondary' onClick={onCancel}>Continue Browsing</button>
                </div>
            </div>
        </div>

    )
}

export default ProfileRedirect