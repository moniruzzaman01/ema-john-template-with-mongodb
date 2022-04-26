const addToLocalStorage = (id) => {
  //initialize object
  let cartProduct = getStoredData();
  //handle the object property
  let quantity = cartProduct[id];
  if (quantity) {
    //increase the quantity of same data
    const newQuantity = quantity + 1;
    cartProduct[id] = newQuantity;
  } else {
    //add new data in cartProduct object
    cartProduct[id] = 1;
  }
  localStorage.setItem("cart-product", JSON.stringify(cartProduct));
};

const removeCartData = () => {
  localStorage.removeItem("cart-product");
};

const getStoredData = () => {
  //initialize object
  let cartProduct = {};
  //condition chect data exist or not in local storage
  const savedProduct = localStorage.getItem("cart-product");
  if (savedProduct) {
    cartProduct = JSON.parse(savedProduct);
  }
  return cartProduct;
};

export { addToLocalStorage, removeCartData, getStoredData };
