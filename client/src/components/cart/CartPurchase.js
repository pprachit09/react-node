import React, { useState, useEffect } from "react";
import { getItem } from "./cartHelper";
import { Link } from "react-router-dom";
import Card from "../homepage/Card";
import Layout from "../layout/Layout";
import CheckOut from "./CheckOut";

const CartPurchase = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItem());
  }, [items]);

  const showItems = () => (
    <div>
      <h4>Your cart has {items.length} items</h4>
      <hr />
      {items.map(product => (
        <Card
          key={product._id}
          product={product}
          showAddCartButton={false}
          updateCart={true}
          showRemoveButton={true}
        />
      ))}
    </div>
  );

  const noItemInCart = () => (
    <h4>
      Your Cart is empty <br /> <Link to="/shop">Countinue Shopping</Link>
    </h4>
  );

  return (
    <div>
      <Layout title="Shopping Cart" description="Manage your cart" />
      <div className="row">
        <div className="col l3 offset-l2">
          {items.length > 0 ? showItems() : noItemInCart()}
        </div>
        <div className="col l6 offset-l1">
          <div className="container">
            <h4>Your Cart Summary</h4>
            <hr />
            <CheckOut products={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPurchase;
