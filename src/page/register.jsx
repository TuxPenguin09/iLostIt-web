import React, { useState } from 'react';
import './register.css'
import axios from 'axios';

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registering, setRegistering] = useState(false);
    const [success, setSuccess] = useState(false)

    function RegisterAtAPI() {
        console.log("Registering")
        if (password === confirmPassword) {
            setRegistering(true);
            axios.post("http://localhost:6885/accounts/register", {
                username: username,
                password: password,
                confirmpassword: confirmPassword
            })
                .then(res => {
                    console.log(res);
                    setRegistering(false);
                    setSuccess(true)
                })
                .catch(err => {
                    console.log(err);
                    setRegistering(false);
                })
        } else {
            console.log("Passwords do not match");
        }
    }

    return (
        <div className="RegisterPage">
            {success ? (<div className="success">Successfully registered!</div>) : (<span>
                <h2>Register</h2>
                <p>Username: <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} disabled={registering} /></p>
                <p>Password: <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} disabled={registering} /></p>
                <p>Confirm Password: <input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} disabled={registering} /></p>
                {registering ? (null) : (<div className="register-btn" onClick={() => RegisterAtAPI()}>Register</div>)}
            </span>)}
        </div>
    )
}

export default RegisterPage