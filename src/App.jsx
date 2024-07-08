import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./components/Store";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
};

export default App;
