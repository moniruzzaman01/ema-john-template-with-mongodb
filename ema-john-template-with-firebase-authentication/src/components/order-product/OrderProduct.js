import React from "react";
import "./OrderProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const OrderProduct = ({ product }) => {
  return (
    <div className="order-product-container">
      <img src="" alt="" />
      <div className="details">
        <h6 title={product.name}>
          ${product.name.slice(0, 25) + (product.name.length > 25 ? "..." : "")}
        </h6>
        <p>
          Price: <span>${product.price}</span>
        </p>
        <p>
          ShippingCharge: <span>${product.shipping}</span>
        </p>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default OrderProduct;
