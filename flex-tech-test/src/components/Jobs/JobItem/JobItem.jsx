import React from "react";
import { useDispatch } from "react-redux";
import { removeJobsite } from "../../../redux/actions";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./jobitem.css";

const JobItem = ({ job, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate(`/jobdetails/${job.name}`, { state: { job } });
  };

  const getStatusColor = () => {
    switch (job.status) {
      case "completed":
        return "#57bb8a";
      case "on road":
        return "#FFFF00";
      case "on hold":
        return "#e74c3c";
      default:
        return "";
    }
  };

  return (
    <li className="job-item">
      <div className="job-item__content">
        <span className="job-item__name" onClick={handleJobClick}>
          {job.name}
        </span>
        <div className="job-item__status-container">
          <button
            className={`job-item__status job-item__status--${job.status
              .replace(" ", "-")
              .toLowerCase()}`}
            style={{ backgroundColor: getStatusColor() }}
          >
            {job.status}
          </button>
        </div>
      </div>
      <div className="job-item__actions">
        <button
          className="job-item__actions__btn job-item__actions__btn--remove"
          onClick={() => dispatch(removeJobsite(index))}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default JobItem;
