import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './misc/header';
import axios from 'axios';
import { saveAs } from 'file-saver'

import ItemPage from './page/item';
import RegisterPage from './page/register'
import AddItemPage from './misc/additem'
import ItemByUserPage from './page/ItemAddedByUser'
import AuditLogPage from './misc/auditlog';
import { MessagesPage, DirectMessagePage } from './page/messages'
import SuperAdminPage from './admin'

import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const hostname = process.env.REACT_APP_HOSTNAME;
Chart.defaults.color = '#FFFFFF';

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

  const [TotalItems, setTotalItems] = useState([])

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

    axios.get(`${hostname}/items/countitems`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        setTotalItems(res.data.tags)
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

    const dataitems = [
      { tag: "Electronics", count: parseInt(TotalItems["Electronics"]) },
      { tag: "Books and Notebooks", count: parseInt(TotalItems["Books and Notebooks"]) },
      { tag: "Clothing", count: parseInt(TotalItems["Clothing"]) },
      { tag: "Writing Materials", count: parseInt(TotalItems["Writing Materials"]) },
      { tag: "Instruments", count: parseInt(TotalItems["Instruments"]) },
      { tag: "Others", count: parseInt(TotalItems["Other"]) },
    ];

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
            <option value="Books_and_Notebooks">Books and Notebooks</option>
            <option value="Clothing">Clothing</option>
            <option value="Writing_Materials">Writing Materials</option>
            <option value="Instruments">Instruments</option>
            <option value="Other">Other</option>
          </select>
        </span><br />

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
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="approved_founded">Claimed and Donated to Charity</option>
          </select>
        </span><br />
        <br />

        <h3>Charts</h3>
        <div>
          Total Items by Tags:<br />
          - Electronics: {TotalItems.Electronics}<br />
          - Books And Notebooks: {TotalItems["Books and Notebooks"]}<br />
          - Clothing: {TotalItems["Clothing"]}<br />
          - Writing Materials: {TotalItems["Writing Materials"]}<br />
          - Instruments: {TotalItems["Instruments"]}<br />
          - Others: {TotalItems["Other"]}<br />
        </div>

        <Bar options={{
          responsive: true,
          aspectRatio: 28/9,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: false,
            },
          },
          scales: {
            yAxes: {
              scaleLabel: {
                display: true,
                fontColor: 'white',
                fontSize: 25,
                labelString: 'Item2',
              },
              ticks: {
                beginAtZero: true,
              },
            },
          },
        }} data={{
          labels: Object.keys(dataitems).map(key => dataitems[key].tag),
          datasets: [
            {
              label: 'Item',
              data: Object.keys(dataitems).map(key => dataitems[key].count),
              backgroundColor: 'rgba(54, 162, 255, 0.5)',
            }
          ]
        }} />
        <br />
        {sorts.status === "All" ? (
          <div id="additem-button" onClick={() => {
            axios.get(`${process.env.REACT_APP_HOSTNAME}/items/csv`, {
              responseType: 'blob',
              headers: {
                  Accept: "application/vnd.ms-excel",
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }).then((response) => {
              saveAs(response.data, 'ilost_items-' + new Date().toJSON() + '.csv');
          });
          }}>Export Items as CSV</div>
        ) : sorts.status === "approved" ? (
          <div id="additem-button" onClick={() => {
            axios.get(`${process.env.REACT_APP_HOSTNAME}/items/csv/approved`, {
              responseType: 'blob',
              headers: {
                  Accept: "application/vnd.ms-excel",
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }).then((response) => {
              saveAs(response.data, 'ilost_items_approved-' + new Date().toJSON() + '.csv');
          });
          }}>Export Approved Items as CSV</div>
        ) : sorts.status === "pending" ? (
          <div id="additem-button" onClick={() => {
            axios.get(`${process.env.REACT_APP_HOSTNAME}/items/csv/pending`, {
              responseType: 'blob',
              headers: {
                  Accept: "application/vnd.ms-excel",
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }).then((response) => {
              saveAs(response.data, 'ilost_items_pending-' + new Date().toJSON() + '.csv');
          });
          }}>Export Pending Items as CSV</div>
        ) : sorts.status === "approved_founded" ? (
          <div id="additem-button" onClick={() => {
            axios.get(`${process.env.REACT_APP_HOSTNAME}/items/csv/founded`, {
              responseType: 'blob',
              headers: {
                  Accept: "application/vnd.ms-excel",
                  Authorization: `Bearer ${localStorage.getItem("token")}`
              }
          }).then((response) => {
              saveAs(response.data, 'ilost_items_founded-' + new Date().toJSON() + '.csv');
          });
          }}>Export Founded Items as CSV</div>
        ) : null}
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
                  <option value="Books_and_Notebooks">Books and Notebooks</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Writing_Materials">Writing Materials</option>
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
