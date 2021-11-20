import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import { useMediaQuery } from 'react-responsive';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [bih, setBih] = useState(false);
  const { items } = cartCtx;
  
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })

  const btnClasses = `${isTabletOrMobile ? classes.button__mobile : classes.button} ${bih ? classes.bump : ""}`;
  const badgeClass = `${isTabletOrMobile ? classes.badge__mobile : classes.badge}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBih(true);

    const timer = setTimeout(() => {
      setBih(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      {!isTabletOrMobile && <span>Your Cart</span>}
      <span className={badgeClass}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
