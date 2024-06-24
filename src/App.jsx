import "./App.css";
import Customers from "./components/Customer/Customers";
import Home from "./components/Home/Home";
import Navigation from "./components/Navbar/Navigation";
import AddCustomer from "./components/Customer/AddCustomer";
import NotFound from "./components/NotFound";
import CustomerDetails from "./components/Customer/CustomerDetails";
import EditCustomer from "./components/Customer/EditCustomer";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
