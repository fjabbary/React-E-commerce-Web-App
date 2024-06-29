import "./App.css";
import Customers from "./components/Customer/Customers";
import Home from "./components/Home/Home";
import Navigation from "./components/Navbar/Navigation";
import AddCustomer from "./components/Customer/AddCustomer";
import NotFound from "./components/NotFound";
import CustomerDetails from "./components/Customer/CustomerDetails";
import EditCustomer from "./components/Customer/EditCustomer";

import { Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import AddProduct from "./components/Products/AddProduct";
import ProductDetails from "./components/Products/ProductDetails";
import EditProduct from "./components/Products/EditProduct";
import Orders from "./components/Orders/Orders";

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

        <Route path="/products" element={<Products />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
