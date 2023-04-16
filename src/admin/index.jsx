import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const hostname = process.env.REACT_APP_HOSTNAME;

function SuperAdminPage(props) {

    let navigate = useNavigate();

    const [addAdmin, setAddAdmin] = useState(false)
    const [addAdminPasswordShown, setAddAdminPasswordShown] = useState(false)
    const [admins, setAdmins] = useState([])

    const [loggedIn, setLoggedIn] = useState({
        loggingin: false,
        username: '',
        password: '',
        disabled: false,
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get(`${hostname}/accounts/me?token=${localStorage.getItem('token')}`)
                .then((res) => {
                    if (parseInt(res.data.permission) > 2) {
                        navigate('/')
                    } else {
                        axios.get(`${hostname}/accounts/adminlist`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        .then(res => {
                            setAdmins(res.data)
                        })
                        .catch((err) => {
                            navigate('/')
                        })
                    }
                })
                .catch((err) => {
                    navigate('/')
                })
        }
    }, [])

    function AddAdmin() {
        setLoggedIn({ ...loggedIn, loggingin: true, disabled: true })
        axios.post(`${hostname}/accounts/register/admin`, {
            username: loggedIn.username,
            password: loggedIn.password
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                var popped = admins.push({id: res.data.id, username: loggedIn.username})
                setAdmins([...admins, popped])
                setLoggedIn({ ...loggedIn, username: '', password: '', loggingin: false, disabled: false })
                setAddAdmin(false)
            })
    }

    function DeleteAdmin(idse) {
        if (window.confirm("Are you sure you want to delete this admin?")) {
            axios.post(`${hostname}/accounts/delete/admin`, {
                id: idse
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(resultdel => {
                var newAdmins = admins.filter((admin) => {
                    return admin.id !== idse
                })
                setAdmins(newAdmins)
            })
        }
    }

    return (
        <div className='AuditLogWindow'>
            <h2>Super Admin Panel</h2>
            <h3>Admin Credentials</h3>
            {addAdmin ? (<div>
                Provide their username:
                <input type="text" placeholder="Username" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({ ...loggedIn, username: e.target.value })} value={loggedIn.username} /><br />
                <br />
                <input type={addAdminPasswordShown ? "text" : "password"} placeholder="Password" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({ ...loggedIn, password: e.target.value })} value={loggedIn.password} /><br />
                {addAdminPasswordShown ? <span style={{ cursor: "pointer" }} onClick={() => setAddAdminPasswordShown(false)}>Hide Password</span> : <span style={{ cursor: "pointer" }} onClick={() => setAddAdminPasswordShown(true)}>Show Password</span>}<br />
                <br />
                {loggedIn.disabled ? null : <div>
                    {loggedIn.username !== '' && loggedIn.password !== '' ? <span><div id="additem-button" onClick={() => {
                        AddAdmin()
                    }}>Add {loggedIn.username}</div><br /></span> : null}
                    <div id="itempage-report" onClick={() => setAddAdmin(false)}>Cancel</div>
                </div>}
            </div>) : (<span><div id="additem-button" onClick={() => setAddAdmin(true)}>Add Admin Credential</div><br /></span>)}

            Click on the names to delete<br />
            {admins.map((admin, index) => {
                return (
                    <div key={index}>
                        - <span style={{ cursor: "pointer" }} onClick={() => { DeleteAdmin(admin.id) }}>{admin.username}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default SuperAdminPage;