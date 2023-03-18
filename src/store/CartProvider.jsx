import { useReducer } from "react";
import CartContext from "./cart-context";

const initState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updateItems;
    if (existingItemIndex !== -1) {
      const existingCartItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingCartItem,
        amount: +existingCartItem.amount + +action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updatedItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let updateItems;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const cartItem = state.items[existingItemIndex];
    const updatedItem = {
      ...cartItem,
      amount: +cartItem.amount - 1,
    };
    if (updatedItem.amount === 0) {
      updateItems = [...state.items];
      updateItems = [
        ...updateItems.slice(0, existingItemIndex),
        ...updateItems.slice(existingItemIndex + 1),
      ];
    } else {
      updateItems = [...state.items];
      updateItems[existingItemIndex] = updatedItem;
    }
    const updatedTotalAmount = state.totalAmount - cartItem.price;
    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action === "CLEAR") {
    return initState;
  }
  return initState;
};
function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearAllItemsHandler = (id) => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearAllItems: clearAllItemsHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
