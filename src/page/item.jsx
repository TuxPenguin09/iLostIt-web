import React, { useState } from 'react';

const itemlos=(props)=>
{
    return(<div>
        <p>Time Found:{null}</p>
        <p>Finder Name:{null}</p>
        <p>Item:{null}</p>
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