import React, { useEffect, useState } from "react";
import "./Admin.css";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalAmount: 0,
    productsSold: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);

    let totalAmount = 0;
    let totalProducts = saved.length;

    saved.forEach((order) => {
      totalAmount += order.price;
    });

    setStats({
      totalOrders: saved.length,
      totalAmount,
      productsSold: totalProducts,
    });
  }, []);

  const updateStatus = (index, newStatus) => {
    let updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="admin-page">

      {/* ================= DASHBOARD SECTION ================= */}
      <section className="dashboard-section">
        <h1 className="admin-title">Dashboard Overview</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>

          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>₹{stats.totalAmount}.00</p>
          </div>

          <div className="stat-card">
            <h3>Products Sold</h3>
            <p>{stats.productsSold}</p>
          </div>
        </div>
      </section>

      {/* ================= ORDER DETAILS SECTION ================= */}
      <section className="orders-section">
        <h2 className="section-title">Product Order Details</h2>

        {orders.length === 0 ? (
          <p className="empty-msg">No orders available</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-card">

              <div className="order-left">
                <img src={order.image} alt={order.name} className="order-img" />

                <div className="order-info">
                  <h3>{order.name}</h3>
                  <p><b>Price:</b> ₹{order.price}</p>
                  <p><b>Payment:</b> {order.payment}</p>
                  <p>
                    <b>Status:</b>
                    <span className={`status ${order.status === "Delivered" ? "delivered" : "processing"}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>


              <div className="order-right">
                <h4>Customer Details</h4>
                <p><b>Name:</b> {order.user.name}</p>
                <p><b>Mobile:</b> {order.user.mobile}</p>
                <p><b>Email:</b> {order.user.email}</p>
                <p><b>Address:</b> {order.user.address}</p>

                <div className="btn-group">
                  <button onClick={() => updateStatus(index, "Processing")}>
                    Mark Processing
                  </button>
                  <button onClick={() => updateStatus(index, "Delivered")}>
                    Mark Delivered
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </section>

    </div>
  );
}

export default AdminDashboard;
