import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart, item]);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart }}>
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
