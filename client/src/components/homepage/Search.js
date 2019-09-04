import React, { useState, useEffect } from "react";
import { getCategories } from "../../api/admin";
import { productList } from "../../api/apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  const loadCategories = () => {
    getCategories().then(res => {
      if (res.error) {
        console.log(res.error);
      } else {
        setData({ ...data, categories: res });
      }
    });
  };

  const { category, categories, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchForm = () => (
    <form onSubmit={searchSubmit} className="col l8">
      <div className="row">
        <div className="input-field col l4 offset-l2">
          <select
            className="browser-default"
            onChange={handleSearch("category")}
          >
            <option value="All">All</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-field col l4">
          <input type="search" className="" onChange={handleSearch("search")} />
          <label>Search</label>
        </div>
        <div className="input-field col l2">
          <button className="btn red darken-1" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  const showSearchData = () => (
    <div>
        <h4 className="center">
            {searchMessage()}
        </h4>
        <div className="row">
            {results.map(result => (
                <Card key={result._id} product={result} />
            ))}
        </div>
    </div>
  )

  const searchMessage = () => {
      if(searched && results.length > 0){
          return `Found ${results.length} Products`
      }
      if(searched && results.length < 1){
          return `Products Not Found`
      }
  }

  const searchData = () => {
    if (search) {
      productList({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleSearch = name => e => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  return (
    <div>
        <div className="row ">
            {searchForm()}
        </div>
        {showSearchData()}
    </div>
  ) 
};

export default Search;
