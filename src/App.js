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
    const existingBook = cart.find((book) => book.id === item.id);
    let newCart;
    if (existingBook) {
      newCart = cart.map((book) =>
        book.id === item.id ? { ...book, no: book.no + 1 } : book
      );
    } else {
      newCart = [...cart, { ...item, no: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  console.log(cart);
  const removeItem = (id) => {
    const existingBook = cart.find((book) => book.id === id);
    let newCart;
    if (existingBook && existingBook.no === 1) {
      newCart = cart.filter((item) => item.id !== id);
    } else if (existingBook) {
      newCart = cart.map((item) =>
        item.id === id ? { ...item, no: item.no - 1 } : item
      );
    } else {
      newCart = cart;
    }
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
