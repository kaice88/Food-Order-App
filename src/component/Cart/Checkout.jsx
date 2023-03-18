import styles from "./Checkout.module.css";
import { useRef, useState } from "react";

function Checkout(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const nameRef = useRef();
  const postalCodeRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isNotFiveCharacters = (value) => value.length !== 5;

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredCodeIsValid = !isNotFiveCharacters(enteredCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      code: enteredCodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredCodeIsValid;

    if (!formIsValid) {
      return;
    }
    console.log("validated form");
    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      code: enteredCode,
      city: enteredCity,
    });
  };
  const classNameInput = formInputValidity.name
    ? styles.control
    : `${styles.control} ${styles.invalid}`;
  const classStreetInput = formInputValidity.street
    ? styles.control
    : `${styles.control} ${styles.invalid}`;
  const classCodeInput = formInputValidity.code
    ? styles.control
    : `${styles.control} ${styles.invalid}`;
  const classCityInput = formInputValidity.city
    ? styles.control
    : `${styles.control} ${styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={classNameInput}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={classStreetInput}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && <p>Please enter valid street</p>}
      </div>
      <div className={classCodeInput}>
        <label htmlFor="code">Postal Code</label>
        <input ref={postalCodeRef} type="text" id="name" />
        {!formInputValidity.code && <p>Please enter valid code</p>}
      </div>
      <div className={classCityInput}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.city && <p>Please enter valid city</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
