import Header from "./components/Layout/Header";
import { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { Routes, Route, useLocation } from "react-router-dom";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ThankyouPage from "./components/CheckoutPage/ThankyouPage";


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const location = useLocation();
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {!(location.pathname === "/thankyoupage") && <Header onShowCart={showCartHandler} />}
      <main>
        <Routes>
          <Route path="/" element={<Meals category="allitems"/>} exact/>
          <Route path="/pizzas" element={<Meals category="pizza" />} />
          <Route path="/appetizers" element={<Meals category="appetizer" />} />
          <Route path="/desserts" element={<Meals category="dessert" />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/thankyoupage" element={<ThankyouPage />} />
        </Routes>
      </main>
    </CartProvider>
    
  );
}

export default App;
