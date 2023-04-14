import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './misc/header';
import axios from 'axios';

import ItemPage from './page/item';
import RegisterPage from './page/register'
import AddItemPage from './misc/additem'
import ItemByUserPage from './page/ItemAddedByUser'
import AuditLogPage from './misc/auditlog';
import { MessagesPage, DirectMessagePage } from './page/messages'
import SuperAdminPage from './admin'

const hostname = process.env.REACT_APP_HOSTNAME;

function gridsoflost(lostItems) {
  function itemFront(item) {
    return (
      <div id="itemlostlists-item" style={{
        backgroundColor: item.status === "pending" ? "rgb(255 255 182)" : item.founded ? "rgb(134 255 119)" : null
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {Header()}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/*" element={<ItemPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/itembyuser" element={<ItemByUserPage />} />
          <Route path="/log" element={<AuditLogPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:item/:user" element={<DirectMessagePage />} />
          <Route path="/admin" element={<SuperAdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Home() {
  const [noperm, setNoPerm] = useState(false);
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
    loggingin: false,
    username: '',
    password: '',
    permission: 255
  })
  const [lostItems, setLostItems] = useState([

  ]);

  const [sorts, setSorts] = useState({
    tag: "All",
    status: "All"
  })

  useEffect(() => {
    axios.get(`${hostname}/items?tag=${sorts.tag}&status=${sorts.status}`, {
      'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data)
        setLostItems(res.data)
      })
      .catch(err => {
        setNoPerm(true)
      })

    if (localStorage.getItem('token')) {
      axios.get(`${hostname}/accounts/me?token=${localStorage.getItem('token')}`)
        .then((res) => {
          setLoggedIn({ ...loggedIn, loggedIn: true, username: res.data.username, permission: parseInt(res.data.permission) })
        })
      //setLoggedIn({ ...loggedIn, loggedIn: true, username: key.split('+')[0], permission: key.split('+')[1] })
    }
  }, [])

  function AdminView() {
    return (
      <div>
        <h2>Dashboard</h2>
        <h3>Lost Items</h3>

        <span>
          Tags:
          <select value={sorts.tag} onChange={async (e) => {
              await setSorts({ ...sorts, tag: e.target.value })
              await setLostItems([])
              await axios.get(`${hostname}/items?tag=${e.target.value}&status=${sorts.status}`, {
                'headers': {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
                .then(res => {
                  console.log(res.data)
                  setLostItems(res.data)
                })
                .catch(err => {
                  setNoPerm(true)
                })
            }}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Books and Notebooks">Books and Notebooks</option>
            <option value="Clothing">Clothing</option>
            <option value="Writing Materials">Writing Materials</option>
            <option value="Instruments">Instruments</option>
            <option value="Other">Other</option>
          </select>
        </span><br />
        <br />

        <span>
          Status:
          <select value={sorts.status} onChange={async (e) => {
              await setSorts({ ...sorts, status: e.target.value })
              await setLostItems([])
              await axios.get(`${hostname}/items?tag=${sorts.tag}&status=${e.target.value}`, {
                'headers': {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
                .then(res => {
                  console.log(res.data)
                  setLostItems(res.data)
                })
                .catch(err => {
                  setNoPerm(true)
                })
            }}>
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="approved_founded">Claimed and Donated to Charity</option>
          </select>
        </span><br />
        <br />

        {gridsoflost(lostItems)}
      </div>
    )
  }

  return (
    <div className='App-body'>
      {loggedIn.permission <= 3 ? (
        <span>
          {AdminView()}
        </span>
      ) : (
        <span>
          <h2>Lost Items</h2>
          {noperm ? <div>Sorry, you need to login to view the list</div> : (
            <span>
              <span>
                Tags:
                <select value={sorts.tag} onChange={async (e) => {
                  await setSorts({ ...sorts, tag: e.target.value })
                  await setLostItems([])
                  await axios.get(`${hostname}/items?tag=${e.target.value}&status=All`, {
                    'headers': {
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                  })
                    .then(res => {
                      console.log(res.data)
                      setLostItems(res.data)
                    })
                    .catch(err => {
                      setNoPerm(true)
                    })
                }}>
                  <option value="All">All</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Books and Notebooks">Books and Notebooks</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Writing Materials">Writing Materials</option>
                  <option value="Instruments">Instruments</option>
                  <option value="Other">Other</option>
                </select>
              </span><br />
              <br />
              {gridsoflost(lostItems)}
            </span>
          )}
        </span>
      )}
    </div>
  )
}

export default App;
