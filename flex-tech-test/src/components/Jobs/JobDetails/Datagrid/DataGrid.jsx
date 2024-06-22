import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataGridModal from "../DataGridModal/DataGridModal";
import { FaSearch } from "react-icons/fa";
import { updateCategoryItems } from "../../../../redux/actions";
import projImg1 from "../../../../assets/emptyBox.png";
import "./datagrid.css";

const DataGrid = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const filteredData =
    selectedCategory && Array.isArray(selectedCategory.items)
      ? selectedCategory.items.filter((item) =>
          item.item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const handleRowDoubleClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedRow(null);
    setShowModal(true);
  };

  const handleSaveChanges = (item) => {
    let updatedData;

    if (selectedRow) {
      updatedData = selectedCategory.items.map((row) =>
        row.id === selectedRow.id ? { ...row, ...item } : row
      );
    } else {
      item.id = idCounter;
      setIdCounter(idCounter + 1);
      updatedData = selectedCategory.items
        ? [...selectedCategory.items, item]
        : [item];
    }

    dispatch(updateCategoryItems(selectedCategory.cat, updatedData));
    setShowModal(false);
  };

  if (!selectedCategory || !selectedCategory.cat) {
    return (
      <div className="data-grid">
        <div className="empty-message">
          <img
            src={projImg1}
            alt="No Service Selected"
            className="empty-message-image"
          />
          <p className="empty-message-text">
            No Service Selected <br />
            Please select a service on your left to proceed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-grid">
      <div className="data-grid-header">
        <div className="category-name">{selectedCategory.cat}</div>
        <div className="search-label">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="datagrid-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <button className="add-button" onClick={handleAddNew}>
        +
      </button>
      <div className="data-grid-content">
        {filteredData.length === 0 ? (
            <div className="empty-message">
            <img
              src={projImg1}
              alt="No Service Selected"
              className="empty-message-image"
            />
            <p className="empty-message-text">
              No Service Selected <br />
              Please select a service on your left to proceed.
            </p>
          </div>
        ) : (
          <>
            <div className="data-grid-row labels">
              <div>Nr.</div>
              <div>Item</div>
              <div>Quantity</div>
              <div>Description</div>
              <div>Notes</div>
            </div>
            {filteredData.map((item, index) => (
              <div
                key={item.id || index}
                className={`data-grid-row ${index % 2 === 0 ? "odd-row" : ""}`}
                onDoubleClick={() => handleRowDoubleClick(item)}
              >
                <div>{item.id}</div>
                <div>{item.item}</div>
                <div>{item.quantity}</div>
                <div>{item.description}</div>
                <div>{item.notes}</div>
              </div>
            ))}
          </>
        )}
      </div>
      {showModal && (
        <DataGridModal
          showModal={showModal}
          setShowModal={setShowModal}
          saveChanges={handleSaveChanges}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
};

export default DataGrid;
