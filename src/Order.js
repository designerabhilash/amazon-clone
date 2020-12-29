import moment from 'moment';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import BasketItem from './BasketItem';
import './Order.css'

const Order = ({order}) => {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, hh:mm:ss')}</p>
            <p className="order_id">
                <small>Order Id: {order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <BasketItem
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat 
                renderText={(value) => (
                    <div className="subtotal_price mt_1">
                        <h3 className="order_total">
                            Order Total: <strong>{value}</strong>
                        </h3>
                    </div>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={'₹'}
            />
        </div>
    )
}

export default Order
