import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { getProducts } from "../../api/apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);

  return (
    <div>
      <Layout title="MERN" description="Node React Ecommerce site" />
      <Search />
      <div className="row">
        <h4>Best Sellers</h4>
        {productBySell.map((product, i) => (
          <div key={i} className="col s12 m6 l3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <div className="row">
        <h4>New Arrivals</h4>
        {productByArrival.map((product, i) => (
          <div key={i} className="col s12 m6 l3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
