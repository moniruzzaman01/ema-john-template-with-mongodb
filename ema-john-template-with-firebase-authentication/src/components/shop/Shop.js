import React, { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import { addToLocalStorage, getStoredData } from "../../utilities/fakedb-2";
import OrderSummary from "../order-summary/OrderSummary";
import Product from "../product/Product";
import "./Shop.css";

function Shop() {
  const [products] = useProducts();
  const [cart, setCart] = useState([]);
  //onload cart set
  useEffect(() => {
    const localCart = getStoredData();
    const keys = Object.keys(localCart);
    let newCart = [];
    for (const id of keys) {
      const cartedItem = products.find((product) => product.id === id);
      const quantity = localCart[id];
      if (cartedItem) {
        cartedItem.quantity = quantity;
        newCart.push(cartedItem);
      }
    }
    setCart(newCart);
  }, [products]);
  //onclick cart set
  const handleCartBtn = (product) => {
    let newCart;
    const isExist = cart.find((c) => c.id === product.id);
    if (isExist) {
      isExist.quantity += 1;
      const rest = cart.filter((c) => c.id !== product.id);
      newCart = [...rest, isExist];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToLocalStorage(product.id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product, key) => (
          <Product
            key={key}
            handleCartBtn={handleCartBtn}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <OrderSummary cart={cart}></OrderSummary>
      </div>
    </div>
  );
}

export default Shop;
