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

    const [changePassword, setChangePassword] = useState({
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
        submitting: false
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

    function ChangePassword() {
        if (changePassword.newpassword === changePassword.confirmpassword) {
            setChangePassword({...changePassword, submitting: true})
            axios.post(`${hostname}/accounts/changepassword/admin`, {
                oldpwd: changePassword.oldpassword,
                newpassword: changePassword.newpassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                setChangePassword({...changePassword, submitting: false, oldpassword: '', newpassword: '', confirmpassword: ''})
            })
            .catch(err => {
                setChangePassword({...changePassword, submitting: false})
            })
        }
    }

    return (
        <div className='AuditLogWindow'>
            <h2>Super Admin Panel</h2>
            <div>
                <h3>Change Password</h3>
                Old Password:
                <input type="text" placeholder="Old Password" disabled={changePassword.submitting} onChange={(e) => {setChangePassword({...changePassword, oldpassword: e.target.value})}} value={changePassword.oldpassword} /><br />
                <br />
                New Password:
                <input type="text" placeholder="New Password" disabled={changePassword.submitting} onChange={(e) => {setChangePassword({...changePassword, newpassword: e.target.value})}} value={changePassword.newpassword} /><br />
                <br />
                Confirm Password:
                <input type="text" placeholder="Confirm Password" disabled={changePassword.submitting} onChange={(e) => {setChangePassword({...changePassword, confirmpassword: e.target.value})}} value={changePassword.confirmpassword} /><br />
                <br />
                {changePassword.submitting ? null : <div id="additem-button" onClick={() => {ChangePassword()}}>Change Password</div>}
            </div>
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