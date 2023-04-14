import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import headerlogo from '../header-logo.svg'
import axios from 'axios'
import './header.css'

const hostname = process.env.REACT_APP_HOSTNAME;

function Header() {

    const [LoginWindow, setLoginWindow] = useState(false)
    const [UserWindow, setUserWindow] = useState(false)

    const [loggedIn, setLoggedIn] = useState({
        loggedIn: false,
        loggingin: false,
        username: '',
        password: '',
        permission: 255
    })

    function Login() {
        setLoggedIn({ ...loggedIn, loggingin: true })
        axios.post(`${hostname}/accounts/login`, {
            "username": loggedIn.username,
            "password": loggedIn.password
        })
        .then((res) => {
            console.log(res)
            setLoggedIn({ ...loggedIn, loggingin: false, loggedIn: true, username: res.data.username, password: '' })
            localStorage.setItem('token', res.data.token)
            setLoginWindow(false)
        })
        .catch((err) => {
            console.log(err)
            setLoggedIn({ ...loggedIn, loggingin: false })
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get(`${hostname}/accounts/me?token=${localStorage.getItem('token')}`)
            .then((res) => {
                setLoggedIn({ ...loggedIn, loggedIn: true, username: res.data.username, permission: parseInt(res.data.permission) })
            })
            //setLoggedIn({ ...loggedIn, loggedIn: true, username: key.split('+')[0], permission: key.split('+')[1] })
        }
    }, [])

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
                <input type="text" placeholder="Username" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({...loggedIn, username: e.target.value})} value={loggedIn.username} /><br />
                <br />
                <input type="password" placeholder="Password" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({...loggedIn, password: e.target.value})} value={loggedIn.password} /><br />
                <br />
                <button style={{
                    backgroundColor: "rgb(103 255 95)",
                    display: loggedIn.loggingin ? ("none") : ("inline-block"),
                }} onClick={() => Login()}>Login</button><br />
                <br />
                <Link to="/register" onClick={() => setLoginWindow(false)}><sub>Don't have an account? Register here!</sub></Link>
            </div> : null}

            {UserWindow && loggedIn.loggedIn ? (
                <div className='UserWindow' style={{
                    height: loggedIn.permission <= 3 ?  "230px" : null
                }}>
                    <div style={{
                        position: "absolute",
                        right: "15px",
                        fontSize: "25px",
                        color: "#ff5f5f",
                        cursor: "pointer",
                        userSelect: "none",
                    }} onClick={() => { setUserWindow(false) }}>X</div>
                    <h2>{loggedIn.username}</h2>
                    <Link to={'/add'} onClick={() => setUserWindow(false)}><div id="userwin-button">Add lost item</div></Link>
                    <Link to={'/itembyuser'}><div id="userwin-button" onClick={() => setUserWindow(false)}>View added lost items</div></Link>
                    {loggedIn.permission <= 1 ? <Link to={'/admin'}><div id="userwin-button" onClick={() => setUserWindow(false)}>Super Admin Panel</div></Link> : null}
                    {loggedIn.permission <= 3 ? <Link to={'/log'}><div id="userwin-button">Audit Log</div></Link> : null}
                    <div id="userwin-logout" onClick={() => {
                        setLoginWindow(false)
                        setUserWindow(false)
                        setLoggedIn({ ...loggedIn, loggedIn: false, username: '' })
                        localStorage.removeItem('token')
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