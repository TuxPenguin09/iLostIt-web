import React, { useState } from 'react';
import './item.css'

function ItemPage(props) {
    return (
        <div className="ItemPage">
            <h2>Item</h2>
            <img id="itempage-image" src={null} alt="Lost Item" />
            <p>Lost since {null} founded by {null}</p>
            <div id="itempage-sendmessage">Conatct Founder</div>

        </div>
    )
}

export default ItemPage;