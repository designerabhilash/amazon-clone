import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import BasketItem from './BasketItem';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

const Payment = () => {
    const[{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const[succeeded, updateSucceeded] = useState(false);
    const[processing, updateProcessing] = useState("")
    const[error, updateError] = useState(null);
    const[disabled, updateDisabled] = useState(true);
    const[clientSecret, updateClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getCartTotal(basket) * 100}` 
            });
            updateClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    // console.log('👱', user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            db
                .collection('users')
                .doc(user?.uid) 
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            // paymentIntent = payment confirmation
            updateSucceeded(true);
            updateError(null);
            updateProcessing(false);

            dispatch({
                type: 'EMPYT_CART'
            })

            history.replace('/orders')
        })
    }

    const handleChange = (e) => {
        // Listen for changes in CardElements
        // and display any error as the customer types their card details
        updateDisabled(e.empty)
        updateError(e.error ? e.error.message : '')
    }

    return (
        <div className="payment">
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>
            <div className="payment_container">
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>123 Civil Lines</p>
                        <p>Ludhiana, Punjab</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items & Delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map((item, index) => (
                            <div key={index}>
                                <BasketItem 
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            </div>
                            ))
                        }
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContiner">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <div className="subtotal_price mt_1">
                                            <p>
                                                Order Total ({basket.length} items): <strong>{value}</strong>
                                            </p>
                                        </div>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={'₹'}
                                />
                                <button className="payment_buynow" disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
