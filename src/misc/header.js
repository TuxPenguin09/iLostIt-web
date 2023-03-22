import React, { useState } from 'react';
import headerlogo from '../header-logo.svg'

function Header() {

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: false,
        username: ''
    })

    return (
        <span>
            <div className="Header">
                <img className='headerlogo' src={headerlogo} />
                <div className="header-login-btn">Login</div>
            </div>
            <br />
            <br />
        </span>
    )
}

export default Header;