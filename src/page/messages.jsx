import React, { useState } from 'react';
import './register.css'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const hostname = process.env.REACT_APP_HOSTNAME;

export function MessagesPage(props) {
    return (
        <div style={{padding: "10px"}}>
            <h2>Messages</h2>
        </div>
    )
}


export function DirectMessagePage(props) {
    const { ":item": itemid } = useParams();
    const { ":user": userid } = useParams();
    
    return (
        <div style={{padding: "10px"}}>
            <h2>Message</h2>
        </div>
    )
}