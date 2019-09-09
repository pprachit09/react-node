import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "../cart/cartHelper";

const Card = ({
  product,
  showViewButton = true,
  showAddCartButton = true,
  updateCart = false,
  showRemoveButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

  const handleAddtoCart = () => {
    if (showAddCartButton) {
      return (
        <button onClick={addTocart} className="btn-small lime accent-3">
          Add to cart
        </button>
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (showRemoveButton) {
      return (
        <button
          onClick={() => removeItem(product._id)}
          className="btn-small red lighten-1"
        >
          Remove
        </button>
      );
    }
  };

  const showUpdateCartOptions = () => {
    if (updateCart) {
      return (
        <div className="input-field">
          <input
            type="number"
            onChange={handleChange(product._id)}
            value={count}
          />
          <label>Adjust Quantity</label>
        </div>
      );
    }
  };

  const handleChange = productId => e => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value > 0) {
      updateItem(productId, e.target.value);
    }
  };

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
          {handleRemoveFromCart()}
          {showUpdateCartOptions()}
        </div>
      </div>
    </div>
  );
};

export default Card;
