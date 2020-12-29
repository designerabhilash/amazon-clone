import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

const Header = () => {
    const[{basket, user}, dispatch] = useStateValue();

    const handleAuth = () => {
        if(user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <div className="logo_search">
                <Link to="/"><img src="logo.png" className="header_logo" alt="logo" /></Link>
                <div className="header_search">
                    <input type="text" className="header_searchinput"/>
                    <SearchIcon className="header_searchicon"/>
                </div>
            </div>
            <div className="header_right">
                <div className="header_nav">
                    <Link to={!user && "/login"}>
                        <div onClick={handleAuth} className="header_option">
                            <span className="header_optionlineone">Hello, {!user ? 'Guest' : user.email}</span>
                            <span className="header_optionlinetwo">{user ? 'Sign Out' : 'Sign In'}</span>
                        </div>
                    </Link>
                    <Link to="/orders">
                        <div className="header_option">
                            <span className="header_optionlineone">Returns</span>
                            <span className="header_optionlinetwo">& Orders</span>
                        </div>
                    </Link>
                    <div className="header_option">
                        <span className="header_optionlineone">Your</span>
                        <span className="header_optionlinetwo">Prime</span>
                    </div>
                </div>
                <Link to="/checkout">
                    <div className="header_optionbasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionlinetwo header_basketcount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
