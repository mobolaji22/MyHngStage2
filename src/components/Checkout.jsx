import { useState, useEffect } from "react";
import { FaArrowLeft, FaPaypal, FaRegCreditCard } from "react-icons/fa6";
import { PiHandCoinsLight } from "react-icons/pi";
import "../css/checkout.css";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState("free");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotals(storedCart);
  }, []);

  const remove = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const calculateTotals = (cartItems) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% tax
    const shipping = selectedShipping === "free" ? 5 : 0;
    const total = subtotal + tax + shipping;

    setSubtotal(subtotal);
    setTax(tax);
    setTotal(total);
  };

  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
    calculateTotals(cart);
  };

  const back = () => {
    window.history.back();
  };

  const placeOrder = () => {
    localStorage.removeItem("cart");
    setCart([]);
    window.history.back();
  };

  return (
    <div className="checkout">
      <div className="order-summary">
        <div className="summary">
          <span>
            <button className="back" onClick={back}>
              <FaArrowLeft />
            </button>
            <h2>ORDER SUMMARY</h2>
          </span>
          <div className="checkout-cart-items">
            {cart.map((item, index) => (
              <div key={index} className="checkout-cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="checkout-cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="remove" onClick={() => remove(item)}>
                  &#215;
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="payment-options">
          <h3>Select Payment Options</h3>
          <div className="payment-methods">
            <p>
              <FaRegCreditCard />
            </p>
            <p>
              <FaPaypal />
            </p>
            <p>
              <PiHandCoinsLight />
            </p>
          </div>
          <div className="coupon">
            <input type="text" id="coupon" placeholder="COUPON" />
            <button>APPLY</button>
          </div>
          <div className="payment-details">
            <div className="subtotal">
              <h4>Subtotal</h4>
              <h4>${subtotal.toFixed(2)}</h4>
            </div>
            <div className="tax">
              <h4>Tax</h4>
              <h4>${tax.toFixed(2)}</h4>
            </div>
            <h4>Shipping</h4>
            <div className="free">
              <span>
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={selectedShipping === "free"}
                  onChange={handleShippingChange}
                />
                <h4>Free</h4>
              </span>
              <p>$0.00</p>
            </div>
            <div className="flat">
              <span>
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={selectedShipping === "flat"}
                  onChange={handleShippingChange}
                />
                <h4>Flat</h4>
              </span>
              <p>$5.00</p>
            </div>
            <hr />
            <div className="total">
              <h4>Total</h4>
              <h4>${total.toFixed(2)}</h4>
            </div>
          </div>
          <button className="order" onClick={placeOrder}>Place Your Order Now</button>
        </div>
      </div>
      <div className="billing-details">
        <div className="summarysm">
          <button className="backsm" onClick={back}>
            <FaArrowLeft />
          </button>
          <h2>Billing Details</h2>
        </div>
        <form>
          <div className="name">
            <div className="last-name">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="first-name">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
          </div>
          <div className="email">
            <label>Email Address</label>
            <input type="text" placeholder="Email Address" />
          </div>
          <div className="company">
            <label>Company Name</label>
            <input type="text" placeholder="Eg: Infinity Inc" />
          </div>
          <div className="country">
            <label htmlFor="country">Country/Region</label>
            <select name="country" id="country">
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <input type="text" placeholder="Street Address" />
          </div>
          <div className="number">
            <label>Telephone Number</label>
            <div className="num">
              <select name="zip-code" id="zip-code">
                <option value="12345"></option>
                <option value="67890">+234</option>
              </select>
              <input type="text" placeholder="Phone Number" />
            </div>
          </div>
          <div className="create">
            <input type="checkbox" name="create" id="create" onClick={back}/>
            Create An Account
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
