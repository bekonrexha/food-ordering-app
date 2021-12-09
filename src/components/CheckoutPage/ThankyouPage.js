import classes from "./ThankyouPage.module.css";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useNavigate  } from "react-router-dom";

const ThankyouPage = () => {

  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

  const ContinueHandler= (e) => {
    e.preventDefault();
    cartCtx.clearCart();
    navigate("/");
  }

  return (
    <div className={classes.mainclass}>
        <div><h1>THANK YOU FOR YOUR ORDER</h1></div>
        <div><h2>Estimated delivery time: </h2></div>
        <div><h2>45-60 minutes </h2></div>
        <div className={classes.buttonpadding}>
            <button className={classes.glow__on__hover} onClick={ContinueHandler} type="button">Continue Shopping</button>
            <button className={classes.glow__on__hover} type="button">Order Details</button>
        </div>
    </div>
  );
};

export default ThankyouPage;
