import React, { useState } from 'react';
import './item.css'

const itemlos=(props)=>
{
    return(<div>
        <p id="time_found-item">Time Found:{null}</p>
        <p id="findername">Finder Name:{null}</p>
        <p id="em">Item:{null}</p>
        <img src={null} alt="Lost Item"/>
        </div>);
};

function ItemPage(props) {
    return (
        <div>
            <h2>Item</h2>
            {/*Insert your HTML code here*/}
            {itemlos()}
        </div>
    )
}

export default ItemPage;