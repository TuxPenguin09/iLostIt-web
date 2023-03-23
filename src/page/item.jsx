import React, { useState } from 'react';
import './item.css'

function ItemPage(props) {
    return (
        <div className="ItemPage">
            <h2>Item</h2>
            <div>
                <img id="itempage-image" src={null} alt="Lost Item" />
                <p id="time_found-item">Time Found:{null}</p>
                <p id="findername">Finder Name:{null}</p>
                <p id="em">Item:{null}</p>
                
            </div>
        </div>
    )
}

export default ItemPage;