import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import DataGrid from "./Datagrid/DataGrid";
import "./jobdetails.css";

const JobDetails = () => {
  return (
    <div className="jobsite-container">
      <Sidebar />
      <DataGrid />
    </div>
  );
};

export default JobDetails;
