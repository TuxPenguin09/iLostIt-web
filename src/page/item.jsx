import React, { useEffect, useState } from 'react';
import './item.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const hostname = process.env.REACT_APP_HOSTNAME;

function ItemPage(props) {

    const { "*": itemid } = useParams();

    const [loading, setLoading] = useState({
        loading: true,
        error: false,
    })

    const [itemdet, setitemdet] = useState({
        title: '',
        founder: '',
        date: '',
        image: '',
    })

    useEffect(() => {
        console.log(itemid)
        axios.get(`${hostname}/items/item?itemid=${itemid}`, {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data === undefined || res.data === null || res.data === "") {
                    setLoading({
                        loading: false,
                        error: true,
                    })
                } else {
                    setitemdet({
                        title: res.data.item_name,
                        founder: res.data.username,
                        date: res.data.lost_since,
                        image: res.data.image,
                    })
                    setLoading({
                        loading: false,
                        error: false,
                    })
                }
            })
            .catch(err => {
                console.log(err)
                setLoading({
                    loading: false,
                    error: true,
                })
            })
    }, [itemid])

    return (
        <div className="ItemPage">
            {loading.loading ? (<div className="loading">Loading...</div>) : (loading.error ? (
                <span>
                    <div>No Item found or an error occurred</div>
                </span>
            ) : (<span>
                <h2>{itemdet.title}</h2>
                <span style={{
                    backgroundColor: "white",
                    display: "block",
                    padding: "15px",
                    width: "450px",
                    borderRadius: "7px"
                }}>
                    <img id="itempage-image" src={`${hostname}/cdn/image?img=${itemdet.image}`} alt="Lost Item" />
                    <p style={{ color: "black" }}>Lost since {itemdet.date} founded by {itemdet.founder}</p>
                </span>
                <br />
                <div id="itempage-sendmessage">Contact Facilities Department</div>
                <br />
                <div id="itempage-report">Report Item</div>
            </span>))}
        </div>
    )
}

export default ItemPage;