import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem } from "../cart/cartHelper";

const Card = ({ product, showViewButton = true }) => {
  const [redirect, setRedirect] = useState(false);

  const handleViewButton = () => {
    if (showViewButton) {
      return (
        <Link to={`/product/${product._id}`} className="cyan-text darken-5">
          View
        </Link>
      );
    }
  };

  const showStock = quantity =>
    quantity > 0 ? (
      <span className="new badge blue" data-badge-caption="In Stock"></span>
    ) : (
      <span className="new badge red" data-badge-caption="Out of Stock"></span>
    );

  const handleAddtoCart = () => (
    <button onClick={addTocart} className="btn-small lime accent-3">Add to cart</button>
  );

  const addTocart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const RedirectUser = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div>
      <div className="card large purple lighten-5">
        <div className="card-image">
          <ShowImage
            item={product}
            url="product"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
        <div className="card-content brown-text darken-4">
          <span className="card-title">
            <b>{product.name}</b>
          </span>
          <p>{product.description}</p>
          <p className="black-text">${product.price}</p>
          <p>Added {moment(product.createdAt).fromNow()}</p>
        </div>
        <div className="card-action">
          {RedirectUser()}
          {handleViewButton()}
          {showStock(product.quantity)}
          {handleAddtoCart()}
        </div>
      </div>
    </div>
  );
};

export default Card;
