import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Card from "../homepage/Card";
import { getCategories } from "../../api/admin";
import { getProductsBySearch } from "../../api/apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { price } from "./FixedPrices";

const ShowShop = () => {
  const [myFilters, setmyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    //console.log(newFilters)
    getProductsBySearch(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getProductsBySearch(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          className="waves-effect waves-light btn-small lime accent-2 black-text"
          onClick={loadMore}
        >
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log(filters, filterBy)
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(myFilters.filters);
    setmyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <div>
      <Layout title="Shopping Page" description="Ready to shop?"></Layout>
      <div className="row">
        <div className="col l4">
          <h4>Filter By Categories</h4>
          <CheckBox
            categories={categories}
            handleFilters={filters => handleFilters(filters, "category")}
          />

          <h4>Filter By Price Range</h4>
          <RadioBox
            prices={price}
            handleFilters={filters => handleFilters(filters, "price")}
          />
        </div>
        <div className="col l8">
          <h4>Products</h4>
          {filteredResult.map((product, i) => (
            <div key={i} className="col s12 m6 l4">
              <Card product={product} />
            </div>
          ))}
          {loadMoreButton()}
        </div>
      </div>
    </div>
  );
};

export default ShowShop;
