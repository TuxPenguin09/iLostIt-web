import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                }} onClick={() => { setLoginWindow(false) }}>X</div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" /><br />
                <br />
                <input type="text" placeholder="Password" /><br />
                <br />
                <button style={{
                    backgroundColor: "rgb(103 255 95)",
                }}>Login</button><br />
                <br />
                <sub>Don't have an account? Register here!</sub>
            </div> : null}
            <div className="Header">
                <Link to="/"><img className='headerlogo' src={headerlogo} /></Link>
                <div className="header-login-btn" onClick={() => { setLoginWindow(true) }}>Login</div>
            </div>
            <br />
            <br />
        </span>
    )
}

export default Header;