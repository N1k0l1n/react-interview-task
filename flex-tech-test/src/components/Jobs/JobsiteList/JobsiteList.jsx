import React from "react";
import { useSelector } from "react-redux";
import JobItem from "../JobItem/JobItem";
import "./jobsiteList.css";

const JobsiteList = () => {
  const filteredJobs = useSelector((state) => {
    const jobs = state.jobs;
    const filter = state.filter;
    const searchTerm = state.searchTerm?.toLowerCase();

    return jobs.filter((job) => {
      const matchesFilter =
        (filter === "Completed" && job.status === "Completed") ||
        (filter === "On Hold" && job.status === "On Hold") ||
        (filter === "On Road" && job.status === "On Road") ||
        filter === "ALL";

      const matchesSearch = job.name.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  return (
    <div className="jobsite-list-container">
      <div className="jobsite-list-header">
        <div className="jobsite-list-header-item">JobSiteName</div>
        <div className="jobsite-list-header-item">Status</div>
      </div>
      <ul className="jobsite-list">
        {filteredJobs.map((job, index) => (
          <JobItem key={index} job={job} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default JobsiteList;
