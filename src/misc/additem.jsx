import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './additem.css'
import axios from 'axios'

const hostname = process.env.REACT_APP_HOSTNAME;

function AddItem(props) {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        image: '',
        name: '',
        processing: false,
    });

    function AddItemRequest() {
        const formData = new FormData()
        formData.append('item_name', item.name)
        formData.append('image', item.image)
        setItem({...item, processing: true})
        axios.post(`${hostname}/items/add`, formData, {
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            setItem({...item, image: '', name: '', processing: false})
            navigate('/item/' + res.data.id)
        })
        .catch(err => {
            setItem({...item, processing: false})
        })
    }

    return (
        <div className='AddItemWindow'>
            <h2>Add Item</h2>
            <p>Note that the staff may need to review your item, after creating one here, head to the staff along with the lost item for approval</p>
            <p>Item Name: <input type='text' disabled={item.processing} onChange={(e) => setItem({...item, name: e.target.value})} placeholder='Item Name' /></p>
            <p>Item Image: <input type='file' disabled={item.processing} onChange={(e) => setItem({...item, image: e.target.files[0]})} placeholder='Image' /></p>
            <br />
            {item.processing ? (null) : (<div id="additem-button" onClick={() => AddItemRequest()}>Add Lost Item</div>)}
        </div>
    )
}

export default AddItem