import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Menu from "./components/homepage/Menu";
import Home from "./components/homepage/Home";
import PrivateRoute from "./components/routes/PrivateRoutes";
import AdminRoute from "./components/routes/AdminRoute";
import UserDashboard from "./components/user/UserDashboard";
import AdmindDashboard from "./components/user/AdminDashboard";
import AddCategory from "./components/admin/AddCategory"
import AddProduct from "./components/admin/AddProduct"
import ShowShop from "./components/shop/ShowShop"
import Product from "./components/product/Product"
import CartPurchase from "./components/cart/CartPurchase";

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={ShowShop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdmindDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={CartPurchase} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
