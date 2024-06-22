import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateSelectedCategory } from "../../../../redux/actions";
import { FaChevronLeft } from "react-icons/fa";
import "./sidebar.css";

const Sidebar = () => {
  const jobs = useSelector((state) => state.jobs);
  const { jobName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedJob = jobs.find((job) => job.name === jobName);
  const jobCategories = selectedJob?.categories || [];

  const handleCategoryClick = (category) => {
    dispatch(updateSelectedCategory(category));
  };

  const handleGoBack = () => {
    navigate(`/`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{jobName}</h2>
      </div>
      <div className="category-filters">
        {jobCategories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryClick(category)}>
            {category.cat}
          </button>
        ))}
      </div>
      <div className="go-back-button">
        <button onClick={handleGoBack}>
          <FaChevronLeft className="go-back-icon" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
