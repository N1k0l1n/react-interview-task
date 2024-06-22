import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaTimes, FaCheck } from "react-icons/fa";
import { addJobsite } from "../../redux/actions";
import "./modal.css";

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCategoryChange = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((cat) => cat !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleAdd = () => {
    if (name !== "" && categories.length > 0 && status !== "") {
      const categoryObjects = categories.map((cat, index) => ({ cat }));
      dispatch(addJobsite(name, status, categoryObjects));
      setName("");
      setCategories([]);
      setStatus("");
      onClose();
    }
  };
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add Jobsite</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <label>Name</label>
          <input
            type="text"
            className="modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type the jobsite's name"
          />
          <div className="upper-container">
            <div className="category-container">
              <label>Categories Included</label>
              <div className="dropdown-container" ref={dropdownRef}>
                <div className="dropdown-header" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {categories.length > 0 ? "Select More Categories" : "Select Categories"}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-list">
                    <label>
                      <input
                        type="checkbox"
                        value="Sidewalk Shed"
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        checked={categories.includes("Sidewalk Shed")}
                      />
                      Sidewalk Shed
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Scaffold"
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        checked={categories.includes("Scaffold")}
                      />
                      Scaffold
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Shoring"
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        checked={categories.includes("Shoring")}
                      />
                      Shoring
                    </label>
                  </div>
                )}
                <div className="selected-categories">
                  {categories.map((cat, index) => (
                    <div key={index} className="selected-category">
                      {cat}
                      <button onClick={() => handleRemoveCategory(cat)}>
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="status-container">
              <label>Status</label>
              <select className="modal-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select one</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="On Road">On Road</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-cancel" onClick={onClose}>
            Cancel Changes <FaTimes />
          </button>
          <button className="modal-save" onClick={handleAdd}>
            Save Changes <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
