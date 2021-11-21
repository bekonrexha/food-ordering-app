import { useRef, useState, useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./CheckoutPage.module.css";
import { Link, useNavigate } from "react-router-dom";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckoutPage = (props) => {

  const navigate = useNavigate();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const [orderDetails, setOrderDetails] = useState({
    enteredName: "",
    enteredStreet: "",
    enteredCity: "",
    enteredPostalCode: "",
  });

  const cartCtx = useContext(CartContext);
  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <li className={classes.items} key={item.id}>
          <div>
            <h2>{item.name}</h2>
            <h2 className={classes.amount}>x{item.amount}</h2>
          </div>
          <div>
            <h2>$ {item.price}</h2>
          </div>
        </li>
      ))}
    </ul>
  );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // const nameInputRef = useRef();
  // const streetInputRef = useRef();
  // const postalCodeInputRef = useRef();
  // const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalCodeInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(orderDetails.enteredName);
    const enteredStreetIsValid = !isEmpty(orderDetails.enteredStreet);
    const enteredCityIsValid = !isEmpty(orderDetails.enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(orderDetails.enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    const userData = {
      name: orderDetails.enteredName,
      street: orderDetails.enteredStreet,
      city: orderDetails.enteredCity,
      postalCode: orderDetails.enteredPostalCode,
    };

    const submitHandler = async (userData) => {
      await fetch(
        "https://food-ordering-app-21d93-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
    };
    submitHandler(userData);
    cartCtx.clearCart();
    navigate('/');
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
    }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
    }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
    }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
    }`;

  return (
    <div className={classes.mainpage}>
      <div className={classes.item1}>
        <h2>{cartItems}</h2>
        <h2>Total Amount: {totalAmount}</h2>
      </div>
      <div className={classes.item2}>
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name"
              // ref={nameInputRef}
              value={orderDetails.enteredName}
              onChange={(event) => setOrderDetails({ ...orderDetails, enteredName: event.target.value })}
            />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
          </div>
          <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street"
              // ref={streetInputRef} 
              value={orderDetails.enteredStreet}
              onChange={(event) => setOrderDetails({ ...orderDetails, enteredStreet: event.target.value })}
            />
            {!formInputsValidity.street && <p>Please enter a valid street!</p>}
          </div>
          <div className={postalCodeControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal"
              // ref={postalCodeInputRef}
              value={orderDetails.enteredPostalCode}
              onChange={(event) => setOrderDetails({ ...orderDetails, enteredPostalCode: event.target.value })}
            />
            {!formInputsValidity.postalCode && (
              <p>Please enter a valid postal code (5 characters long)!</p>
            )}
          </div>
          <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" id="city"
              // ref={cityInputRef} 
              value={orderDetails.enteredCity}
              onChange={(event) => setOrderDetails({ ...orderDetails, enteredCity: event.target.value })}
            />
            {!formInputsValidity.city && <p>Please enter a valid city!</p>}
          </div>
          <div className={classes.actions}>
            <Link to="/">
              <button type="button">Cancel</button>
            </Link>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
