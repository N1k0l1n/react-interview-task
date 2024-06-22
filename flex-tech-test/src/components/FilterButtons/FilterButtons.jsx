import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterJobsites } from "../../redux/actions";
import "./filterButtons.css";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter);

  const handleFilter = (filter) => {
    dispatch(filterJobsites(filter));
  };

  return (
    <div className="filter-buttons">
      <select
        className="filter-select"
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL">Default</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
        <option value="On Road">On Road</option>
      </select>
    </div>
  );
};

export default FilterButtons;
