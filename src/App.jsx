import "./App.css";
import Customer from "./components/Customer/Customer";
import Home from "./components/Home/Home";
import Navigation from "./components/Navbar/Navigation";
import AddCustomer from "./components/Customer/AddCustomer";
import NotFound from "./components/NotFound";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<AddCustomer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
