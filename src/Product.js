import React from 'react';
import './Product.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';

const Product = ({id, title, price, image, rating}) => {
    const[{ basket }, dispatch] = useStateValue();

    const addToCart = () => {
        // Dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product_info">
                <p className="product_title">{title}</p>
                <p className="product_price">
                    <small>₹</small> 
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => {
                        return (
                            <span key={i}><StarIcon fontSize="small" className="rating_icon"/></span>
                        )
                    })}
                </div>
                <img src={image} alt=""/>
                <div className="cartbutton">
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product
