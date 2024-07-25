import { useDispatch, useSelector } from "react-redux"
import foodItem from "./foodItem"
import { clearCart } from "../utils/cartSlice"


const Cart = () => {

  const cartItems = useSelector(store => store.cart.items)
  // const store = useSelector((store) => store)

  const dispatch = useDispatch();

   
    const handleClearCart = () => {
      dispatch(clearCart());
    }



    return (
    <div>
          <h1>Cart Items - {cartItems.length}</h1>
          <button onClick={() => handleClearCart()}> Clear Cart</button>
          <div>
            {cartItems.map((item) => (
                <foodItem key={item.id}{...item} />
            ))}
          </div>
    </div>
  
  )
}

export default Cart