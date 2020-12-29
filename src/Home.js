import React from "react";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img src="banner.jpg" className="home_banner" alt="banner" />
        <div className="home_row">
          <Product
            id="452134851"
            title="The Lean Startup"
            price={350}
            image="https://m.media-amazon.com/images/I/81jgCiNJPUL._AC_UY218_.jpg"
            rating={4}
          />
          <Product 
            id="185234865"
            title="OnePlus Nord 5G (Gray Ash, 12GB RAM, 256GB Storage)"
            price={28950}
            image="https://m.media-amazon.com/images/I/71-8y4L6jKL._AC_UY218_.jpg"
            rating={5}
          />
        </div>
        <div className="home_row home_rowTwo">
          <Product 
            id="2145412444"
            title="All-new Echo Dot (4th Gen)"
            price={4999}
            image="https://images-eu.ssl-images-amazon.com/images/I/31vU1Ec+NIL._AC_SX184_.jpg"
            rating={4}
          />
          <Product 
            id="145125124"
            title="New Apple iPad Pro (11-inch, Wi-Fi, 1TB)"
            price={53750}
            image="https://m.media-amazon.com/images/I/81p1L85KinL._AC_UY218_.jpg"
            rating={4}
          />
          <Product 
            id="784555452"
            title="JBL GO Portable Wireless Bluetooth Speaker"
            price={14550}
            image="https://m.media-amazon.com/images/I/81nAvFCzcRL._AC_UY218_.jpg"
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product 
            id="85124454"
            title="Canon EOS 77D 24.2MP Digital SLR Camera + EF-S 18-135 mm 3.5-5.6 is USM Lens with 16 GB Card Inside and Camera Case"
            price={63870}
            image="https://images-na.ssl-images-amazon.com/images/I/71QYcKmuAhL._SX450_.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
