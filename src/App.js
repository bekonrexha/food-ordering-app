import Header from "./components/Layout/Header";
import { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { Routes, Route } from "react-router-dom";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
<<<<<<< Updated upstream
=======
import ThankyouPage from "./components/CheckoutPage/ThankyouPage";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

>>>>>>> Stashed changes

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Meals category="allitems"/>} />
          <Route path="/pizzas" element={<Meals category="pizza" />} />
          <Route path="/appetizers" element={<Meals category="appetizer" />} />
          <Route path="/desserts" element={<Meals category="dessert" />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
<<<<<<< Updated upstream
=======
          <Route path="/thankyoupage" element={<ThankyouPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
>>>>>>> Stashed changes
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
