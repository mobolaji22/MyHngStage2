// components/Store.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/store.css";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { RiFlashlightLine } from "react-icons/ri";

const Store = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [countdown, setCountdown] = useState(3600);
  const navigate = useNavigate();

  const products = [
    {
      name: "Crazy Faded Blue Jean",
      image: "../public/short.svg",
      price: 345.95,
    },
    {
      name: "Brown Dinner Jacket",
      image: "../public/coat.svg",
      price: 235.4,
    },
    {
      name: "Checkered Trousers",
      image: "../public/pant.svg",
      price: 400.4,
    },
    {
      name: "Beautiful Ankle Boot",
      image: "../public/heel.svg",
      price: 12,
    },
    {
      name: "Comfy White Sneakers",
      image: "../public/sneakers.svg",
      price: 345.95,
    },
    {
      name: "Flowery Skirt",
      image: "../public/skirt.svg",
      price: 235.4,
    },
    {
      name: "Plitted Black Gown",
      image: "../public/gown.svg",
      price: 400.4,
    },
    {
      name: "Adire Shirts",
      image: "../public/adire.svg",
      price: 790.99,
    },
    {
      name: "Office Set",
      image: "../public/set.svg",
      price: 345.95,
    },
    {
      name: "Corporate Shirt",
      image: "../public/corporate.svg",
      price: 235.4,
    },
    {
      name: "Brown Rain Jacket",
      image: "../public/rain.svg",
      price: 400.4,
    },
    {
      name: "Sleeky Dinner Heels",
      image: "../public/dinner.svg",
      price: 790.99,
    },
    {
      name: "Winter Sweatshirt",
      image: "../public/sweatshirt.svg",
      price: 400.4,
    },
    {
      name: "White Office Shirt",
      image: "../public/white.svg",
      price: 235.4,
    },
    {
      name: "Red Dinner Gown",
      image: "../public/red.svg",
      price: 345.95,
    },
    {
      name: "ANDE Brown Bag",
      image: "../public/ande.svg",
      price: 790.99,
    },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    updateCartCount(storedCart);

    // Start the countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateCartCount = (cartItems) => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalItems);
  };

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.name === product.name);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    updateCartCount(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart
      .map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    updateCartCount(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="store">
      <header>
        <div className="container">
          <h2>MYEshop.com</h2>
          <div className="search-bar">
            <select>
              <option value="all">All category</option>
            </select>
            <button type="submit">
              <CiSearch id="search" />
            </button>
            <input
              type="text"
              placeholder="Search all products or brands here"
            />
          </div>

          <div className="icons">
            <div
              className="icon-cart"
              onClick={() => document.body.classList.toggle("showCart")}
            >
              <FaShoppingCart />
              <span>{cartCount}</span>
            </div>
            <div className="icon-heart">
              <FaRegHeart />
            </div>
          </div>
        </div>
      </header>

      <div className="hero">
        <img src="../public/limited.svg" alt="" />
      </div>

      <div className="categories">
        <img src="../public/Ellipse 3.svg" alt="" />
        <img src="../public/Ellipse 4.svg" alt="" />
        <img src="../public/Ellipse 5.svg" alt="" />
        <img src="../public/Ellipse 6.svg" alt="" />
        <img src="../public/Ellipse 7.svg" alt="" />
        <img src="../public/Ellipse 8.svg" alt="" />
        <img src="../public/Ellipse 9.svg" alt="" />
        <img src="../public/Ellipse 10.svg" alt="" />
        <img src="../public/Ellipse 11.svg" alt="" />
        <LuSettings2 className="setting" />
      </div>

      <section>
        <div className="flash-sale">
          <div className="navigation">
            <div className="countdown">
              <RiFlashlightLine className="flash" />
              <p>Flash sale</p>
              <span>{formatTime(countdown)}</span>
            </div>
            <div className="arrows">
              <button className="left-btn">&larr;</button>
              <button className="right-btn">&rarr;</button>
            </div>
          </div>
          <div className="flash-slide">
            <div className="scroll">
              <div className="flash-card">
                <img src="../public/woman-sitting.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sweet and Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="custom-range"
                  />
                  <span>9/10 sales</span>
                </div>
              </div>
              <div className="flash-card">
                <img src="../public/hat.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sweet and Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="custom-range"
                  />
                  <span>9/10 sales</span>
                </div>
              </div>
              <div className="flash-card">
                <img src="../public/bag.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sweet and Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p>
                    <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="custom-range"
                  />
                  <span>9/10 sales</span>
                </div>
              </div>
              <div className="flash-card">
                <img src="../public/shoe.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sweet and Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="custom-range"
                  />
                  <span>9/10 sales</span>
                </div>
              </div>
              <div className="flash-card">
                <img src="../public/man.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sweet and Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <input
                    type="range"
                    min="0"
                    max="10"
                    className="custom-range"
                  />
                  <span>9/10 sales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="specials">
          <h2>Today's Offer!</h2>
          <div className="selection">
            <div className="tab">Best Seller</div>
            <div className="tab">Keep Stylish</div>
            <div className="tab">Special Discount</div>
            <div className="tab">Official Store</div>
          </div>
        </div>

        <div className="shop">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="icon-heart">
                <FaRegHeart />
              </div>
              <h3>{product.name}</h3>
              <span>
                $<p>{product.price}</p>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="stores">
          <h2>Best Selling Stores</h2>
          <div className="small-hero">
            <img src="" alt="" />
          </div>
          <div className="store-list">
            <div className="store">
              <span>
              <img src="" alt="" />
              <h3>Mobolaji's Store</h3>
              </span>
              <span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
              </span>
            </div>
            <div className="store">
              <span>
              <img src="" alt="" />
              <h3>Whykay's Store</h3>
              </span>
              <span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
              </span>
            </div>
            <div className="store">
              <span>
              <img src="" alt="" />
              <h3>Emmy's Store</h3>
              </span>
              <span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
              </span>
            </div>
            <div className="store">
              <span>
              <img src="" alt="" />
              <h3>ANDE Hub</h3>
              </span>
              <span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
                <span>
                  <img src="" alt="" />
                  <p>$40.00</p>
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div id="cart">
        <h2>Your Cart</h2>
        <div id="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="name">{item.name}</div>
              <div className="quantityPrice">${item.price * item.quantity}</div>
              <div className="quantity">
                <span className="minus" onClick={() => removeFromCart(item)}>
                  -
                </span>
                <span>{item.quantity}</span>
                <span className="plus" onClick={() => addToCart(item)}>
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
        <div id="totalPrice">
          <span>Total:</span>
          <span className="totalPrice">${calculateTotal()}</span>
        </div>
        <div id="cart-btn">
          <button
            id="close"
            onClick={() => document.body.classList.remove("showCart")}
          >
            Close
          </button>
          <button id="checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
