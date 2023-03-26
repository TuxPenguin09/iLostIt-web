import React, { useEffect, useState } from 'react';
import './item.css'
import { useParams } from 'react-router-dom';
const hostname = process.env.REACT_APP_HOSTNAME;


function ItemPage(props) {

    const { "*": itemid } = useParams();

    useEffect(() => {
        console.log(itemid)
    }, [itemid])
    
    return (
        <div className="ItemPage">
            <h2>Item</h2>
            <span style={{
                backgroundColor: "white",
                display: "block",
                padding: "15px",
                width: "450px",
                borderRadius: "7px"
            }}>
                <img id="itempage-image" src={null} alt="Lost Item" />
                <p style={{color: "black"}}>Lost since {""} founded by {""}</p>
            </span>
            <br />
            <div id="itempage-sendmessage">Contact Facilities Department</div>
        </div>
    )
}

export default ItemPage;