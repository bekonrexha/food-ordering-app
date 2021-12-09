import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link, useNavigate } from "react-router-dom";
import AuthContextProvider from "../../store/auth-context";
import { useContext } from "react/cjs/react.development";

const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContextProvider);

  const onChange = (e) => {
    navigate(`/${e.target.value}`);
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div>
          <h1>ReactMeals</h1>
        </div>
        <div className={classes.box}>
          <select name="pages" id="pages" onChange={onChange}>
            <option value="">All Items</option>
            <option value="pizzas">Pizzas</option>
            <option value="appetizers">Appetizers</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>
        <div>
          <HeaderCartButton onClick={props.onShowCart} />
        </div>
        <div>
          {!authCtx.isLoggedIn ? (
            <Link to="/login" className={classes.firsts}>Login</Link>
          ) : (
            <button onClick={logoutHandler} className={classes.button4}>Logout</button>
          )}
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table with food."></img>
      </div>
    </Fragment>
  );
};

export default Header;
