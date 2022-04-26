import React, { useEffect, useState } from "react";
import "./Orders.css";
import OrderProduct from "../order-product/OrderProduct";
import OrderSummary from "../order-summary/OrderSummary";
import useCart from "../../hooks/useCart";

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [cart] = useCart(products);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="orders-container">
      <div className="order-products">
        {cart.map((product, index) => (
          <OrderProduct key={index} product={product}></OrderProduct>
        ))}
      </div>
      <div className="order-cart">
        <OrderSummary cart={cart}></OrderSummary>
      </div>
    </div>
  );
};

export default Orders;
