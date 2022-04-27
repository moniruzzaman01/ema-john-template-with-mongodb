import { useEffect, useState } from "react";
import { getStoredData } from "../utilities/fakedb-2";

const useCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = getStoredData();
    const keys = Object.keys(localCart);
    let newCart = [];
    fetch(`http://localhost:5000/productsById`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((res) => res.json())
      .then((products) => {
        for (const id of keys) {
          const cartedItem = products.find((product) => product.id === id);
          const quantity = localCart[id];
          if (cartedItem) {
            cartedItem.quantity = quantity;
            newCart.push(cartedItem);
          }
        }
        setCart(newCart);
      });
  }, []);
  return [cart, setCart];
};
export default useCart;
