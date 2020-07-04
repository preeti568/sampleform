import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <select
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      name="gender"
    >
      <option defaultValue>Search By Gender </option>
      <option value="male">Male</option>

      <option value="female">Female</option>
    </select>
    // <input
    //   type="text"
    //   name="query"
    //   className="form-control my-3"
    //   placeholder="Search..."
    //   value={value}
    //   onChange={(e) => onChange(e.currentTarget.value)}
    // />
  );
};

export default SearchBox;
