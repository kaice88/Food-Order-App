import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitted, setDidSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemsHandler = (item) => {
    const new_Item = { ...item, amount: 1 };
    cartCtx.addItem(new_Item);
  };
  const removeItemsHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemsHandler.bind(null, item.id)}
          onAdd={addItemsHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkOutHandler = () => {
    setIsCheckout(true);
  };

  const modalAction = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrder = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-2358c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          items: cartCtx.items,
          user: userData,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmitted(true);
    cartCtx.clearAllItems();
  };
  const cartItemsContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onSubmit={submitOrder} onCancel={props.onHideCart}></Checkout>
      ) : (
        modalAction
      )}
    </>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmitted && cartItemsContent}
      {isSubmitting && <p>Loading...</p>}
      {!isSubmitting && didSubmitted && <p>Submit successful</p>}
    </Modal>
  );
}

export default Cart;
