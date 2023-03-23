import React, { useState } from 'react';
import headerlogo from '../header-logo.svg'
import './header.css'

function Header() {

    const [LoginWindow, setLoginWindow] = useState(false)
    const [UserWindow, setUserWindow] = useState(false)

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: true,
        username: ''
    })

    return (
        <span>
            {LoginWindow && !loggedIn.loggedIn ? <div className="LoginWindow">
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
                <br />
                <input type="text" placeholder="Password" /><br />
                <br />
                <button style={{
                    backgroundColor: "rgb(103 255 95)",
                }}>Login</button><br />
                <br />
                <sub>Don't have an account? Register here!</sub>
            </div> : null}

            {UserWindow && loggedIn.loggedIn ? (
                <div className='UserWindow'>
                    <div style={{
                    position: "absolute",
                    right: "15px",
                    fontSize: "25px",
                    color: "#ff5f5f",
                    cursor: "pointer",
                    userSelect: "none",
                }} onClick={() => {setUserWindow(false)}}>X</div>
                <div id="userwin-logout">Logout</div>
                </div>
            ) : null}

            <div className="Header">
                <img className='headerlogo' src={headerlogo} />
                {loggedIn.loggedIn ? (
                    <div className="header-login-btn" onClick={() => {setUserWindow(true)}}>User</div>
                ) : (
                    <div className="header-login-btn" onClick={() => {setLoginWindow(true)}}>Login</div>
                )}
            </div>
            <br />
            <br />
        </span>
    )
}

export default Header;