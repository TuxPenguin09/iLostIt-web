import React, { useState } from 'react';
import headerlogo from '../header-logo.svg'

function Header() {

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: false,
        username: ''
    })

    return (
        <div className="Header">
            
        </div>
    )
}

export default Header;