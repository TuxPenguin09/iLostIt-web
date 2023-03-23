import React, { useState } from 'react';
import './register.css'

function RegisterPage() {
    return (
        <div className="RegisterPage">
            <h2>Register</h2>
            <p>Username: <input type='text' placeholder='Username'/></p>
            <p>Password: <input type='password' placeholder='Password'/></p>
            <p>Confirm Password: <input type='password' placeholder='Confirm Password'/></p>
            <div className="register-btn">Register</div>
        </div>
    )
}

export default RegisterPage