import React, { useState, useEffect } from "react";
import M from "materialize-css";
import Layout from "../layout/Layout";
import { isAuthenticated } from "../../api/auth";
import { createProduct, getCategories } from "../../api/admin";

const AddProduct = () => {
  //get user and token from localstorage
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const newProductForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="file-field input-field">
        <div className="btn">
          <span>Image</span>
          <input onChange={handleChange("photo")} type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <div className="input-field">
        <input
          onChange={handleChange("name")}
          type="text"
          className="validate"
          value={name}
        />
        <label htmlFor="name">Product Name</label>
      </div>

      <div className="input-field">
        <textarea
          onChange={handleChange("description")}
          className="materialize-textarea"
          value={description}
        />
        <label htmlFor="description">Description</label>
      </div>

      <div className="input-field">
        <input
          type="number"
          className="validate"
          onChange={handleChange("price")}
          value={price}
        />
        <label htmlFor="price">Price</label>
      </div>

      <strong>Pick Category</strong>
      {showCategories()}

      <div className="input-field">
        <select onChange={handleChange("shipping")}>
          <option>-</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <label htmlFor="shipping">Shipping</label>
      </div>

      <div className="input-field">
        <input
          type="number"
          className="validate"
          onChange={handleChange("quantity")}
          value={quantity}
        />
        <label htmlFor="quantity">Quantity</label>
      </div>

      <button type="submit" className="btn indigo accent-4">
        Submit
      </button>
    </form>
  );

  //load all categories
  const init = () => {
    M.AutoInit();
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues(values => ({
          ...values,
          categories: data,
          formData: new FormData()
        }));
      }
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
          redirectToProfile: true,
          error: false,
          formData: ""
        });
      }
    });
  };

  const showCategories = () => (
    <div className="input-field">
      {categories &&
        categories.map((c, i) => (
          <p key={i}>
            <label>
              <input
                value={c._id}
                type="radio"
                name="group1"
                className="with-gap"
                onChange={handleChange("category")}
              />
              <span>{c.name}</span>
            </label>
          </p>
        ))}
    </div>
  );

  const showSuccess = () => {
    if (createdProduct) {
        return <h5 className='green-text text-darken-3'>{createdProduct} is created</h5>
    }
  }

  const showError = () => {
    if (error) {
        return <h5 className='red-text text-darken-3'>{error}</h5>
    }
  }

  const showLoading = () => {
    if(loading) {
      return <h5>Loading...</h5>
    }
  }

  return (
    <div>
      <Layout
        title="Add a new Product"
        description={`${user.name} are you ready to add new product?`}
      />
      <div className="row">
        <div className="col l6">
          <div className="container">
            {showError()}
            {showSuccess()}
            {showLoading()}
            {newProductForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
