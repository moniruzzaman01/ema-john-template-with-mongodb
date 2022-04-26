import React from "react";
import "./OrderSummary.css";

function OrderSummary({ cart }) {
  let totalProduct = 0;
  let totalPrice = 0;
  let shippingCharge = 0;
  for (const product of cart) {
    totalProduct += product.quantity;
    totalPrice += product.price * product.quantity;
    shippingCharge += product.shipping;
  }
  const tax = totalPrice * (10 / 100);
  const grandTotal = totalPrice + shippingCharge + tax;
  return (
    <div className="order-summary">
      <div className="order">
        <h2>Order Summary</h2>
        <p>Added Product : {totalProduct} </p>
        <p>Total Price : {totalPrice} </p>
        <p>Shipping Charge : {shippingCharge} </p>
        <p>Tax : {tax.toFixed(2)} </p>
        <h3>Grand Total : {grandTotal.toFixed(2)} </h3>
      </div>
    </div>
  );
}

export default OrderSummary;
