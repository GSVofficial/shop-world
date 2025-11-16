import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import Toast from "./Toast";


function Cart() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // User information
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: ""
  });

  // Payment
  const [toastMsg, setToastMsg] = useState("");
  const [payment, setPayment] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(cartItems);
  }, []);



  const removeItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const startOrder = (item) => {
    setSelectedItem(item);
    setShowPayment(false); // payment section hidden
    setUser({ name: "", mobile: "", email: "", address: "" });
    setPayment("");
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();

    // Check empty fields
    if (!user.name || !user.mobile || !user.email || !user.address) {
      setToastMsg("Please fill all details before continuing!");
      return;
    }

    setShowPayment(true);
  };

  const placeOrder = () => {
    if (!payment) {
      setToastMsg("Select a payment method!");
      return;
    }

    // Create new order
    const newOrder = {
      name: selectedItem.name,
      price: selectedItem.price,
      payment: payment,
      status: "Processing",
      image: selectedItem.image,   // ✅ ADD THIS LINE
      user: { ...user }
    };


    // Save into localStorage
    const prev = JSON.parse(localStorage.getItem("orders")) || [];
    prev.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(prev));

    // Remove item from cart
    const updated = items.filter((i) => i.id !== selectedItem.id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    setToastMsg("Order placed successfully!");
    setSelectedItem(null);
  };


  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <Link to="/">Back to Shop</Link>
      </header>

      <div className="cart-items">
        {items.length === 0 && <p className="empty">Your cart is empty</p>}

        {items.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt="" />

            <div className="info">
              <h3>{item.name}</h3>
              <h4>${item.price}.00</h4>
            </div>

            <div className="actions">
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>

              <button
                className="order-btn"
                onClick={() => startOrder(item)}
              >
                Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ORDER BOX */}
      {selectedItem && (
        <div className="order-box">
          <h2>Order: {selectedItem.name}</h2>

          {/* USER DETAILS FORM */}
          {!showPayment && (
            <form className="user-form" onSubmit={handleUserDetailsSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />

              <input
                type="text"
                placeholder="Mobile Number"
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />

              <textarea
                placeholder="Full Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              ></textarea>

              <button type="submit" className="continue-btn">
                Continue to Payment
              </button>
            </form>
          )}

          {/* PAYMENT SECTION */}
          {showPayment && (
            <div className="payment-section">
              <h3>Select Payment Method</h3>

              <label>
                <input
                  type="radio"
                  value="UPI"
                  checked={payment === "UPI"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                UPI (Google Pay / PhonePe)
              </label>

              <label>
                <input
                  type="radio"
                  value="Card"
                  checked={payment === "Card"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Credit / Debit Card
              </label>

              <label>
                <input
                  type="radio"
                  value="COD"
                  checked={payment === "COD"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Cash on Delivery
              </label>

              <button className="confirm-btn" onClick={placeOrder}>
                Pay & Place Order
              </button>

              <button
                className="cancel-btn"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      )}

    </div>
  );
}

export default Cart;
