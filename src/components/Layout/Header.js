import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();

  const onChange = (e) => {
    navigate(`/${e.target.value}`);
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <div className={classes.box}>
        <select name="pages" id="pages" onChange={onChange} >
          <option value="">All Items</option>
          <option value="pizzas">Pizzas</option>
          <option value="appetizers">Appetizers</option>
          <option value="desserts">Desserts</option>
        </select>
        </div>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table with food."></img>
      </div>
    </Fragment>
  );
};

export default Header;
