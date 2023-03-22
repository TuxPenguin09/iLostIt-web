import React, { useState } from 'react';
import headerlogo from '../header-logo.svg'

function Header() {

    const [LoginWindow, setLoginWindow] = useState(false)

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: false,
        username: ''
    })

    return (
        <span>
            {LoginWindow ? <div className="LoginWindow">
                <div style={{
                    position: "absolute",
                    right: "15px",
                    fontSize: "25px",
                    color: "#ff5f5f",
                    cursor: "pointer",
                    userSelect: "none",
                }} onClick={() => {setLoginWindow(false)}}>X</div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" /><br />
                <input type="text" placeholder="Password" /><br />
                <button>Login</button><br />
                <sub>Don't have an account? Register here!</sub>
            </div> : null}
            <div className="Header">
                <img className='headerlogo' src={headerlogo} />
                <div className="header-login-btn" onClick={() => {setLoginWindow(true)}}>Login</div>
            </div>
            <br />
            <br />
        </span>
    )
}

export default Header;