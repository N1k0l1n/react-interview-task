import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobsite, updateSearchTerm } from "../../../redux/actions";
import { BsSearch } from "react-icons/bs";
import JobsiteList from "../JobsiteList/JobsiteList";
import FilterButtons from "../../FilterButtons/FilterButtons";
import CardContainer from "../../Card/CardContainer";
import Modal from "../../Modal/Modal";
import "./jobsite.css";

const Jobsite = () => {
  const jobsites = useSelector((state) => state.jobsites);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJobsite = (text) => {
    dispatch(addJobsite(text));
  };

  const handleAddJobsiteClick = () => {
    setIsModalOpen(true);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddJobsiteFromModal = (text) => {
    handleAddJobsite(text);
    handleCloseModal();
  };

  return (
    <>
      <div className="card-container-root">
        <CardContainer />
      </div>
      <div className="jobsite-app">
        <div className="jobsite-app__filters-and-add">
          <div className="jobsite-app__filters">
            <FilterButtons />
            <div className="jobsite-app__search">
              <button className="jobsite-app__search-btn">
                <BsSearch size={16} />
              </button>
              <input
                className="jobsite-app__search-input"
                type="text"
                placeholder="Search JobSite"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="jobsite-app__add">
              <button
                className="jobsite-app__add-btn"
                onClick={handleAddJobsiteClick}
              >
                Create +
              </button>
            </div>
          </div>
        </div>
        <JobsiteList jobsites={jobsites} filter={filter} />
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAdd={handleAddJobsiteFromModal}
        />
      </div>
    </>
  );
};

export default Jobsite;
