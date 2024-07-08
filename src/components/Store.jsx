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
      name: "Missy",
      image: "../public/nftavatar8.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quo.`,
      price: 15,
    },
    {
      name: "Bored Ape",
      image: "../public/nftavatar1.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quo.`,
      price: 30,
    },
    {
      name: "Jungle Ape",
      image: "/add-to-cart/img/nftavatar2.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 20,
    },
    {
      name: "Lina Win",
      image: "/add-to-cart/img/nftavatar3.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 12,
    },
    {
      name: "Ocean Maiden",
      image: "/add-to-cart/img/nftavatar4.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 10,
    },
    {
      name: "Victor",
      image: "/add-to-cart/img/nftavatar5.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 25,
    },
    {
      name: "Skater",
      image: "/add-to-cart/img/nftavatar6.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 8,
    },
    {
      name: "Bored Dude",
      image: "/add-to-cart/img/nftavatar7.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 22,
    },
    {
      name: "Missy",
      image: "../public/nftavatar8.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quo.`,
      price: 15,
    },
    {
      name: "Bored Ape",
      image: "../public/nftavatar1.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quo.`,
      price: 30,
    },
    {
      name: "Jungle Ape",
      image: "/add-to-cart/img/nftavatar2.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 20,
    },
    {
      name: "Lina Win",
      image: "/add-to-cart/img/nftavatar3.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 12,
    },
    {
      name: "Ocean Maiden",
      image: "/add-to-cart/img/nftavatar4.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 10,
    },
    {
      name: "Victor",
      image: "/add-to-cart/img/nftavatar5.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 25,
    },
    {
      name: "Skater",
      image: "/add-to-cart/img/nftavatar6.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 8,
    },
    {
      name: "Bored Dude",
      image: "/add-to-cart/img/nftavatar7.jpeg",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam,
        quo.`,
      price: 22,
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
            <div className="top-right">
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

        <div id="store">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <img src={product.image} alt={product.name} />
              <div className="icon-heart">
                <FaRegHeart />
              </div>
              <h3 className="name">{product.name}</h3>
              <span>
                $<p className="price">{product.price}</p>
              </span>
            </div>
          ))}
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
