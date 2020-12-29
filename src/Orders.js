import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import './Orders.css'
import { useStateValue } from './StateProvider';

const Orders = () => {
    const[{ basket, user }, dispatch] = useStateValue();
    const[orders, updateOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                updateOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            updateOrders([]);
        }
    }, [user])

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {
                    orders?.map(order => (
                        <Order order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
