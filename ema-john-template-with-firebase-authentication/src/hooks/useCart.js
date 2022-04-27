import { useEffect, useState } from "react";
import { getStoredData } from "../utilities/fakedb-2";
import useProducts from "./useProducts";

const useCart = () => {
  const [products] = useProducts();
  const [cart, setCart] = useState([]);

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
  return [cart, setCart];
};
export default useCart;
