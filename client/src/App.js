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
import Orders from "./components/admin/Orders";
import Profile from "./components/user/Profile";
import ManageProduct from "./components/admin/ManageProduct";
import UpdateProduct from "./components/admin/UpdateProduct";

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
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdmindDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProduct} />
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={CartPurchase} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
