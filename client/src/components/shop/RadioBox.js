import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [values, setValues] = useState(0);

  const handleChange = e => {
    handleFilters(e.target.value)
    setValues(e.target.value)
  };

  return prices.map(price => (
    <p key={price._id}>
      <label>
        <input
          className="with-gap"
          onChange={handleChange}
          value={`${price._id}`}
          name="group2"
          type="radio"
        />
        <span>{price.name}</span>
      </label>
    </p>
  ));
};

export default RadioBox;
