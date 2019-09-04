import React, { useState } from "react";

const CheckBox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = c => () => {
    //If item is not present then it will return -1 or the index
    const categoryId = checked.indexOf(c);
    const newCategoryId = [...checked];

    //if item is not present then add
    //else remove it from array
    if (categoryId === -1) {
      newCategoryId.push(c);
    } else {
      newCategoryId.splice(categoryId, 1);
    }
    setChecked(newCategoryId);
    handleFilters(newCategoryId);
  };

  return categories.map(category => (
    <p key={category._id}>
      <label>
        <input
          onChange={handleToggle(category._id)}
          value={checked.indexOf(category._id)}
          type="checkbox"
        />
        <span>
          <strong>{category.name}</strong>
        </span>
      </label>
    </p>
  ));
};

export default CheckBox;
