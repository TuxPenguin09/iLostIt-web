import React, { useEffect, useState } from 'react';
import axios from 'axios'
const hostname = process.env.REACT_APP_HOSTNAME;

function SuperAdminPage(props) {

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
                    if (!(parseInt(res.data.permission) > 2)) {
                        props.history.push('/')
                    } else {
                        //TODO: Get admins
                        //setAdmins(res.data.admins)
                    }
                })
                .catch((err) => {
                    props.history.push('/')
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
                var popped = admins.push(loggedIn.username)
                setAdmins(popped)
                setLoggedIn({ ...loggedIn, username: '', password: '', loggingin: false, disabled: false })
                setAddAdmin(false)
            })
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
            {/*admins.map((admin, index) => {
                return (
                    <div>
                        <span style={{ cursor: "pointer" }} onClick={() => { }}>{admin.username}</span>
                    </div>
                )
            })*/}
        </div>
    )
}

export default SuperAdminPage;