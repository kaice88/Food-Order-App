import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCart.module.css";
import CartContext from "../../store/cart-context";
function HeaderCart(props) {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce((curAmount, item) => {
    return curAmount + +item.amount;
  }, 0);
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
}

export default HeaderCart;
