import "./Orders.css";
import OrderProduct from "../order-product/OrderProduct";
import OrderSummary from "../order-summary/OrderSummary";
import useCart from "../../hooks/useCart";

const Orders = () => {
  const [cart] = useCart();
  return (
    <div className="orders-container">
      <div className="order-products">
        {cart.map((product, index) => (
          <OrderProduct key={index} product={product}></OrderProduct>
        ))}
      </div>
      <div className="order-cart">
        <OrderSummary></OrderSummary>
      </div>
    </div>
  );
};

export default Orders;
