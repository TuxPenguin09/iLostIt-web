import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './misc/header';

import ItemPage from './page/item';
import RegisterPage from './page/register'

function gridsoflost(lostItems) {
  function itemFront(item) {
    return (
      <div id="itemlostlists-item" key={item.id}>
        <img id="itemlostlists-item-image" src={item.image} />
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
          }} id="itemlostlists-item-lostsince">{item.founder} since {item.lost_since}</span>
        </div>
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {Header()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  const [lostItems, setLostItems] = useState([
    {
      id: 1,
      item_name: `null`,
      founder: `null`,
      lost_since: '2023-01-01',
      image: '',
    },
    {
      id: 1,
      item_name: `null`,
      founder: `null`,
      lost_since: '2023-01-01',
      image: '',
    },
    {
      id: 1,
      item_name: `null`,
      founder: `null`,
      lost_since: '2023-01-01',
      image: '',
    },
    {
      id: 1,
      item_name: `null`,
      founder: `null`,
      lost_since: '2023-01-01',
      image: '',
    }
  ]);
  return (
    <div className='App-body'>
      <h2>Lost Items</h2>
      {gridsoflost(lostItems)}
    </div>
  )
}

export default App;
