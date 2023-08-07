import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const lsCart =
    localStorage.getItem("cart") === null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(lsCart);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeItem = (id) => {
    const newCart = cart.filter((item) => id !== item.id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
