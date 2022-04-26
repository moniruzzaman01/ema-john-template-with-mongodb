import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Product(props) {
  const { img, price, seller, name, ratings } = props.product;
  const handleCartBtn = props.handleCartBtn;
  return (
    <div className="product-container">
      <div className="product">
        <img src={img} alt="" />
        <h3>{name}</h3>
        <h4>
          Price: {price} {/* {`$`} */}
        </h4>
        <p>Manufacture: {seller}</p>
        <p>Rating: {ratings}</p>
      </div>
      <button onClick={() => handleCartBtn(props.product)}>
        <span style={{ margin: "0 5px 0 0" }}>Add to cart</span>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
}

export default Product;
