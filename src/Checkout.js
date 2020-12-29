import React from 'react';
import BasketItem from './BasketItem';
import './Checkout.css'
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

const Checkout = () => {
    const[{ basket, user }, dispatch] = useStateValue();

    return (
        <div className="checkout_section">
            <div className="checkout">
                <div className="checkout_left">
                    <img className="checkout_ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonDevices/PSW1/Prime_Shopping_Week_1500x300_English-Blue-9-12-2020.jpg" alt=""/>
                    <div className="checkout_title">
                        <span>Hello, {user?.email}</span>
                        <h2>Your Shopping Basket</h2>
                        {basket.map((item, i) => {
                            return(
                                <div className="product-list" key={i}>
                                    <BasketItem
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="checkout_right">   
                    <Subtotal/>
                </div>
            </div>
        </div>
    )
}

export default Checkout;