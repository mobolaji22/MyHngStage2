import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/store.css";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { RiFlashlightLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";

const Store = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [countdown, setCountdown] = useState(3600);
  const navigate = useNavigate();

  const products = [
    {
      name: "Crazy Faded Blue Jean",
      image: "/static/images/short.svg",
      price: 345.95,
    },
    {
      name: "Brown Dinner Jacket",
      image: "/static/images/coat.svg",
      price: 235.4,
    },
    {
      name: "Checkered Trousers",
      image: "/static/images/pant.svg",
      price: 400.4,
    },
    {
      name: "Beautiful Ankle Boot",
      image: "/static/images/heel.svg",
      price: 790.99,
    },
    {
      name: "Comfy White Sneakers",
      image: "/static/images/sneakers.svg",
      price: 345.95,
    },
    {
      name: "Flowery Skirt",
      image: "/static/images/skirt.svg",
      price: 235.4,
    },
    {
      name: "Plitted Black Gown",
      image: "/static/images/gown.svg",
      price: 400.4,
    },
    {
      name: "Adire Shirts",
      image: "/static/images/adire.svg",
      price: 790.99,
    },
    {
      name: "Office Set",
      image: "/static/images/set.svg",
      price: 345.95,
    },
    {
      name: "Corporate Shirt",
      image: "/static/images/corporate.svg",
      price: 235.4,
    },
    {
      name: "Brown Rain Jacket",
      image: "/static/images/rain.svg",
      price: 400.4,
    },
    {
      name: "Sleeky Dinner Heels",
      image: "/static/images/dinner.svg",
      price: 790.99,
    },
    {
      name: "Winter Sweatshirt",
      image: "/static/images/sweatshirt.svg",
      price: 400.4,
    },
    {
      name: "White Office Shirt",
      image: "/static/images/white.svg",
      price: 235.4,
    },
    {
      name: "Red Dinner Gown",
      image: "/static/images/red.svg",
      price: 345.95,
    },
    {
      name: "ANDE Brown Bag",
      image: "/static/images/ande.svg",
      price: 790.99,
    },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    updateCartCount(storedCart);

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

  const remove = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
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
            <div className="favorite-cart">
              <FaHeart />
            </div>
            <button type="submit">
              <CiSearch className="search" />
            </button>
          </div>
        </div>
      </header>

      <div className="hero">
        <img
          src="/static/images/limited.svg"
          alt="limited"
          className="limited"
        />
        <img src="/static/images/herosm.svg" alt="limited" className="herosm" />
      </div>

      <div className="categories">
        <img src="/static/images/Ellipse 3.svg" alt="" />
        <img src="/static/images/Ellipse 4.svg" alt="" />
        <img src="/static/images/Ellipse 5.svg" alt="" />
        <img src="/static/images/Ellipse 6.svg" alt="" />
        <img src="/static/images/Ellipse 7.svg" alt="" />
        <img src="/static/images/Ellipse 8.svg" alt="" />
        <img src="/static/images/Ellipse 9.svg" alt="" />
        <img src="/static/images/Ellipse 10.svg" alt="" />
        <img src="/static/images/Ellipse 11.svg" alt="" />
        <p>
          <LuSettings2 className="setting" />
        </p>
      </div>

      <section>
        <div className="flash-sale">
          <div className="navigation">
            <div className="countdown">
              <h1 className="flash">
                <RiFlashlightLine />
              </h1>
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
                <img src="/static/images/woman-sitting.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Comfy Cotton Sweater</p>
                  <span className="price">
                    <p>$400.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <div className="sale-indicator">
                    <div className="indicator">
                      <div></div>
                    </div>
                    <span>9/10 sales</span>
                  </div>
                </div>
              </div>
              <div className="flash-card">
                <img src="/static/images/hat.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Brown Fadora Hat</p>
                  <span className="price">
                    <p>$235.40</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <div className="sale-indicator">
                    <div className="indicator">
                      <div></div>
                    </div>
                    <span>9/10 sales</span>
                  </div>
                </div>
              </div>
              <div className="flash-card">
                <img src="/static/images/bag.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Laptop Bag</p>
                  <span className="price">
                    <p>$345.95</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <div className="sale-indicator">
                    <div className="indicator">
                      <div></div>
                    </div>
                    <span>9/10 sales</span>
                  </div>
                </div>
              </div>
              <div className="flash-card">
                <img src="/static/images/shoe.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Beautiful Ankle Boot</p>
                  <span className="price">
                    <p>$790.99</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <div className="sale-indicator">
                    <div className="indicator">
                      <div></div>
                    </div>
                    <span>9/10 sales</span>
                  </div>
                </div>
              </div>
              <div className="flash-card">
                <img src="/static/images/man.svg" alt="" />
                <div className="icon-heart">
                  <FaRegHeart />
                </div>
                <div className="card-details">
                  <p className="desc">Sunny Shirt</p>
                  <span className="price">
                    <p>$790.99</p> <p className="slashed">$400.40</p>
                  </span>
                  <hr />
                  <div className="sale-indicator">
                    <div className="indicator">
                      <div></div>
                    </div>
                    <span>9/10 sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="specials">
          <h2>Today&#39;s Offer!</h2>
          <div className="selection">
            <div className="tab">Best Seller</div>
            <div className="tab">Keep Stylish</div>
            <div className="tab">Special Discount</div>
            <div className="tab">Official Store</div>
          </div>
        </div>

        <div className="shop">
          {products.map((product, index) => (
            <div
              className="product"
              key={index}
              onClick={() => addToCart(product)}
            >
              <img src={product.image} alt={product.name} />
              <div className="icon-heart">
                <FaRegHeart />
              </div>
              <h3>{product.name}</h3>
              <span>
                $<p>{product.price}</p>
              </span>
              <hr />
              <span className="rating">
                <FaStar className="filled" />
                <FaStar className="filled" />
                <FaStar className="filled" />
                <FaStarHalfAlt className="filled" />
                <FaStarHalfAlt className="filled" />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="stores">
          <h1>Best Selling Stores</h1>
          <div className="collections">
            <div className="small-hero">
              <img src="/static/images/red-bag.jpeg" alt="" />
            </div>
            <div className="store-list">
              <div className="store-item">
                <span className="profile">
                  <span>
                    <img src="/static/images/profile.svg" alt="" />
                    <img src="/static/images/rose.svg" alt="" id="rose" />
                  </span>
                  <div>
                    <h3>Mobolaji&#39;s Store</h3>
                    <p>&#34;Get all you need&#34;</p>
                  </div>
                </span>
                <span className="thumbnails">
                  <span>
                    <img src="/static/images/store-bag.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-shirt.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-socks.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                </span>
              </div>
              <div className="store-item">
                <span className="profile">
                  <span>
                    <img src="/static/images/profile.svg" alt="" />
                    <img src="/static/images/rose.svg" alt="" id="rose" />
                  </span>
                  <div>
                    <h3>Whykay&#39;s Store</h3>
                    <p>&#34;Get all you need&#34;</p>
                  </div>
                </span>
                <span className="thumbnails">
                  <span>
                    <img src="/static/images/store-bag.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-shirt.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-socks.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                </span>
              </div>
              <div className="store-item">
                <span className="profile">
                  <span>
                    <img src="/static/images/profile.svg" alt="" />
                    <img src="/static/images/rose.svg" alt="" id="rose" />
                  </span>
                  <div>
                    <h3>Emmy&#39;s Store</h3>
                    <p>&#34;Get all you need&#34;</p>
                  </div>
                </span>
                <span className="thumbnails">
                  <span>
                    <img src="/static/images/store-bag.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-shirt.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-socks.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                </span>
              </div>
              <div className="store-item">
                <span className="profile">
                  <span>
                    <img src="/static/images/profile.svg" alt="" />
                    <img src="/static/images/rose.svg" alt="" id="rose" />
                  </span>
                  <div>
                    <h3>ANDE Hub</h3>
                    <p>&#34;Get all you need&#34;</p>
                  </div>
                </span>
                <span className="thumbnails">
                  <span>
                    <img src="/static/images/store-bag.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-shirt.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                  <span>
                    <img src="/static/images/store-socks.svg" alt="" />
                    <p>$40.00</p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="footer-hero">
          <div className="overlay"></div>
          <h1>“Let’s Us Shop beyond Boundaries”</h1>
        </div>
      </section>

      <footer>
        <span>
          <div className="subscription">
            <h3>Get Voucher From Us</h3>
            <p>
              Enter your email and stand a chance to win a free voucher from us{" "}
            </p>
            <form>
              <MdOutlineMailOutline />
              <input type="email" placeholder="Enter your email" />
              <FaArrowRight className="submit" />
            </form>
          </div>
          <div className="links">
            <div className="services">
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">About US</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Delivery Information</a>
                </li>
                <li>
                  <a href="#">Terms & Condition</a>
                </li>
                <li>
                  <a href="#">Policy and Privacy</a>
                </li>
              </ul>
            </div>
            <div className="pages">
              <h3>Pages</h3>
              <ul>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Wish list</a>
                </li>
                <li>
                  <a href="#">Cart</a>
                </li>
                <li>
                  <a href="#">Checkout</a>
                </li>
              </ul>
            </div>
          </div>
        </span>
        <div className="socials">
          <ul>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
        </div>
      </footer>

      <div id="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div id="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="quantity">
                  <span className="plus" onClick={() => addToCart(item)}>
                    +
                  </span>
                  <span>{item.quantity}</span>
                  <span className="minus" onClick={() => removeFromCart(item)}>
                    -
                  </span>
                </div>
                <div className="image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="name">{item.name}</div>
                  <div className="quantityPrice">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="remove" onClick={() => remove(item)}>
                  &#215;
                </div>
              </div>
            ))}
          </div>
        )}
        <div id="totalPrice">
          <span>Total:</span>
          <span className="totalPrice">${calculateTotal().toFixed(2)}</span>
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
