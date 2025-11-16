import React, { useState } from "react";
import { Link } from "react-router-dom";

import bag from "./assets/bag.jpeg";
import jacket from "./assets/jacket.jpeg";
import lap from "./assets/lap.jpeg";
import mobile from "./assets/mobile.webp";
import shoe from "./assets/shoe.jpeg";
import watch from "./assets/watch.jpeg";
import stand from "./assets/stand.jpeg";
import flask from "./assets/flask.jpeg";
import Toast from "./Toast"; 
import "./App.css";

function App() {
  const [toastMsg, setToastMsg] = useState("");   // toast state

  const products = [
    { id: 1, name: "Premium Bag", price: 59, image: bag },
    { id: 2, name: "Smart Phone", price: 1559, image: mobile },
    { id: 3, name: "Premium Watch", price: 133, image: watch },
    { id: 4, name: "Men's Shoe", price: 99, image: shoe },
    { id: 5, name: "Mac Laptop", price: 4359, image: lap },
    { id: 6, name: "Leather Jacket", price: 159, image: jacket },
    { id: 7, name: "Laptop Stand", price: 35, image: stand },
    { id: 8, name: "Milton Flask", price: 69, image: flask },
  ];

  // Add to cart handler
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    setToastMsg("Item added to cart!");  // show toast
  };

  return (
    <div className="container">

      {/* Show toast only if message exists */}
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      )}

      <header className="header">
        <h1>Shop World</h1>
        <nav>
          <Link to="/admin">Admin</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h4>${product.price}.00</h4>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
