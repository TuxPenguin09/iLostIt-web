import React, { useEffect, useState } from 'react';
import axios from 'axios'

function SuperAdminPage(props) {

    const [addAdmin, setAddAdmin] = useState(false)
    const [addAdminPasswordShown, setAddAdminPasswordShown] = useState(false)

    const [loggedIn, setLoggedIn] = useState({
        loggingin: false,
        username: '',
        password: ''
    })

    useEffect(() => {

    }, [])

    function AddAdmin() {

    }

    return (
        <div className='AuditLogWindow'>
            <h2>Super Admin Panel</h2>
            <h3>Admin Credentials</h3>
            {addAdmin ? (<div>
                Provide their username:
                <input type="text" placeholder="Username" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({...loggedIn, username: e.target.value})} value={loggedIn.username} /><br />
                <br />
                <input type={addAdminPasswordShown ? "text" : "password"} placeholder="Password" disabled={loggedIn.loggingin} onChange={(e) => setLoggedIn({...loggedIn, password: e.target.value})} value={loggedIn.password} /><br />
                {addAdminPasswordShown ? <span style={{cursor: "pointer"}} onClick={() => setAddAdminPasswordShown(false)}>Hide Password</span> : <span style={{cursor: "pointer"}} onClick={() => setAddAdminPasswordShown(true)}>Show Password</span>}<br />
                <br />
                <div id="additem-button" onClick={() => setAddAdmin(true)}>Add {loggedIn.username}</div><br />
                <div id="itempage-report" onClick={() => setAddAdmin(false)}>Cancel</div>
            </div>) : (<span><div id="additem-button" onClick={() => setAddAdmin(true)}>Add Admin Credential</div><br /></span>)}
            
            Click on the names to delete<br />
            
        </div>
    )
}

export default SuperAdminPage;