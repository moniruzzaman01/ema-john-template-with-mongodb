import React, { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import { addToLocalStorage, getStoredData } from "../../utilities/fakedb-2";
import OrderSummary from "../order-summary/OrderSummary";
import Product from "../product/Product";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [productPerPage, setProductPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  // console.log(products);
  useEffect(() => {
    fetch(
      `http://localhost:5000/products?pageNumber=${pageNumber}&productPerPage=${productPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [pageNumber, productPerPage]);

  //Number of products
  useEffect(() => {
    fetch("http://localhost:5000/numberOfData")
      .then((res) => res.json())
      .then((data) => {
        const totalData = data.number;
        const pages = Math.ceil(totalData / productPerPage);
        setTotalPages(pages);
      });
  }, [productPerPage]);
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
        <div className="pagination">
          {[...Array(totalPages).keys()].map((number, index) => (
            <button
              className={pageNumber === number ? "select" : ""}
              onClick={() => setPageNumber(number)}
              style={{
                marginRight: "5px",
              }}
              key={index}
            >
              {number + 1}
            </button>
          ))}
          <select
            onChange={(e) => setProductPerPage(e.target.value)}
            defaultValue={5}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="cart-container">
        <OrderSummary></OrderSummary>
      </div>
    </div>
  );
}

export default Shop;
