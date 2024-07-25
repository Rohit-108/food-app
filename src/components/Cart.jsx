import { useDispatch, useSelector } from "react-redux";
import FoodItem from "./FoodItem";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
       <div className="cart
    ">
    <div className="item-count">
    <h1>Cart Items - {cartItems.length}</h1>
    
    </div>
     
      <div className="food-item">
        {cartItems.map((item) => (
          <FoodItem key={item.id} food={item} />
        ))}
      </div>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
    </>
   
  );
};

export default Cart;
