import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../header-logo.svg'
import './header.css'

function Header() {

    const [LoginWindow, setLoginWindow] = useState(false)
    const [UserWindow, setUserWindow] = useState(false)

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: false,
        username: 'User'
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

            {UserWindow && loggedIn.loggedIn ? (
                <div className='UserWindow'>
                    <div style={{
                        position: "absolute",
                        right: "15px",
                        fontSize: "25px",
                        color: "#ff5f5f",
                        cursor: "pointer",
                        userSelect: "none",
                    }} onClick={() => { setUserWindow(false) }}>X</div>
                    <h2>{loggedIn.username}</h2>
                    <div id="userwin-button">Add lost item</div>
                    <div id="userwin-button">View added lost items</div>
                    <div id="userwin-button">Messages</div>
                    <div id="userwin-logout" onClick={() => {
                        setLoginWindow(false)
                        setUserWindow(false)
                        setLoggedIn({ ...loggedIn, loggedIn: false, username: '' })
                    }}>Logout</div>
                </div>
            ) : null}

            <div className="Header">
                <Link to="/"><img className='headerlogo' src={headerlogo} /></Link>
                {loggedIn.loggedIn ? (
                    <div className="header-login-btn" onClick={() => { setUserWindow(true) }}>{loggedIn.username}</div>
                ) : (
                    <div className="header-login-btn" onClick={() => { setLoginWindow(true) }}>Login</div>
                )}
            </div>
            <br />
            <br />
        </span>
    )
}

export default Header;