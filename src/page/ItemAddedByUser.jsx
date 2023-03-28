import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const hostname = process.env.REACT_APP_HOSTNAME;

function gridsoflost(lostItems) {
    function itemFront(item) {
      return (
        <div id="itemlostlists-item" style={{
          backgroundColor: item.status === "pending" ? "rgb(255 255 182)" : null
        }} key={item.id}>
          <Link to={`/item/${item.id}`}>
          <img id="itemlostlists-item-image" alt="Lost Item" src={`${hostname}/cdn/image?img=${item.image}`} />
          <div style={{
            position: "absolute",
            marginTop: "311px",
            marginLeft: "10px",
          }}>
            <span id="itemlostlists-item-title">{item.item_name}</span><br />
            <span style={{
              fontSize: "10px",
              position: "absolute",
              width: "300px"
            }} id="itemlostlists-item-lostsince">{item.username} since {item.lost_since}</span>
          </div>
          </Link>
        </div>
      )
    }
    return (
      <div id="itemlostlists">
        {lostItems.map((item, key) => {
          return itemFront(item);
        })}
      </div>
    )
  }

function ItemAddedByUserPage(props) {
    const [noperm, setNoPerm] = useState(false);
    const [itemadded, setItemAdded] = useState([]);

    useEffect(() => {
        axios.get(`${hostname}/items/me`, {
          'headers': {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res.data)
          setItemAdded(res.data)
        })
        .catch(err => {
          setNoPerm(true)
        })
      }, [])
    
      return (
        <div className='App-body'>
          <h2>Lost Items Added by You</h2>
          {noperm ? <div>Sorry, you need to login to view the list</div> : gridsoflost(itemadded)}
        </div>
      )
}

export default ItemAddedByUserPage