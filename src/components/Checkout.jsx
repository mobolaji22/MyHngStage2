import "../css/checkout.css";
import { FaArrowLeft, FaPaypal, FaRegCreditCard } from "react-icons/fa6";
import { PiHandCoinsLight } from "react-icons/pi";

const CheckOut = () => {

  const back = () => {
    window.history.back();
  }

  return (
    <div className="checkout">
      <div className="order-summary">
        <div className="summary">
          <button onClick={back}>
            <FaArrowLeft />
          </button>
          <h2>ORDER SUMMARY</h2>
        </div>
        <div className="payment-options">
          <h3>Select Payment Options</h3>
          <div className="payment-methods">
            <FaRegCreditCard />
            <FaPaypal />
            <PiHandCoinsLight />
          </div>
          <div className="coupon">
            <input type="text" id="coupon" placeholder="COUPON" />
            <button>APPLY</button>
          </div>
          <div className="payment-details">
            <div className="subtotal">
              <h4>Subtotal</h4>
              <h4>$100.00</h4>
            </div>
            <div className="tax">
              <h4>Tax</h4>
              <h4>$5.00</h4>
            </div>
            <h4>Shipping</h4>
            <div className="free">
              <span>
                <input type="radio" name="free" id="free" />
                <h4>Free</h4>
              </span>
              <p>$5.00</p>
            </div>
            <div className="flat">
              <span>
                <input type="radio" name="flat" id="flat" />
                <h4>Flat</h4>
              </span>
              <p>$105.00</p>
            </div>
            <hr />
            <div className="total">
              <h4>Total</h4>
              <h4>$110.00</h4>
            </div>
          </div>
          <button className="order">Place Your Order Now</button>
        </div>
      </div>
      <div className="billing-details">
        <h2>Billing Details</h2>
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
            <input type="checkbox" name="create" id="create" />
            Create An Account
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
