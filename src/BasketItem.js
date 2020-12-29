import React from 'react';
import './BasketItem.css';
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from './StateProvider';
// import FlipMove from 'react-flip-move';


const BasketItem = ({id, image, title, price, rating, hideButton}) => {
    const[{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from basket
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id,
        })
    }
    return (
        <div className="basktitem" key="a">
            <img className="basketitem_image" src={image} alt=""/>
            <div className="basketitem_info">
                <p className="basketitem_title">{title}</p>
                <p className="basketitem_price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="basketitem_rating">
                    {Array(rating).fill().map((_, i) => {
                        return (
                            <span key={i}><StarIcon fontSize="small" className="rating_icon"/></span>
                        )
                    })}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Cart</button>
                )}
            </div>
        </div>
    )
}

export default BasketItem
