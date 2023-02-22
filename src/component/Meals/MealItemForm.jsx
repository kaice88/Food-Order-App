import styles from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";
function MealItemForm(props) {
  const amountRef = useRef();
  const [amountIsValid, setAmountValid] = useState(true);
  const addItemHandler = (e) => {
    e.preventDefault();
    const enterAmount = amountRef.current.value;
    if (
      enterAmount.trim().length === 0 ||
      +enterAmount < 1 ||
      +enterAmount > 5
    ) {
      setAmountValid(false);
      return;
    }

    props.addItem(enterAmount);
  };
  return (
    <form className={styles.form} onSubmit={addItemHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Amount is not Valid!!</p>}
    </form>
  );
}

export default MealItemForm;
