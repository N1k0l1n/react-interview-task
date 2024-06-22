import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import "./datagridmodal.css";

const DataGridModal = ({
  showModal,
  setShowModal,
  saveChanges,
  selectedRow,
}) => {
  const [item, setItem] = useState({
    id: "",
    item: "",
    quantity: "",
    description: "",
    notes: "",
  });

  useEffect(() => {
    if (selectedRow) {
      setItem(selectedRow);
    } else {
      setItem({ id: "", item: "", quantity: "", description: "", notes: "" });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    saveChanges(item);
    setShowModal(false);
  };

  return (
    <div className={`datagrid-modal ${showModal ? "show" : ""}`}>
      <div className="datagrid-modal-content">
        <div className="datagrid-modal-header">
          <h2>{selectedRow ? "Edit Item" : "Add Item"}</h2>
          <button
            className="datagrid-modal-close"
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
        </div>
        <div className="datagrid-modal-body">
          <div className="grupped_items">
            <div className="datagrid-modal-row">
              <label className="datagrid-modal-label">Item</label>
              <input
                type="text"
                name="item"
                value={item.item}
                onChange={handleChange}
                className="datagrid-modal-input"
                placeholder="Enter item"
              />
            </div>
            <div className="datagrid-modal-row">
              <label className="datagrid-modal-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                min={1}
                value={item.quantity}
                onChange={handleChange}
                className="datagrid-modal-input"
                placeholder="Set quantity"
              />
            </div>
          </div>
          <div className="datagrid-modal-row">
            <label className="datagrid-modal-label">Description</label>
            <textarea
              name="description"
              value={item.description}
              onChange={handleChange}
              className="datagrid-modal-textarea"
              placeholder="Type the description..."
            />
          </div>
          <div className="datagrid-modal-row">
            <label className="datagrid-modal-label">Notes</label>
            <textarea
              name="notes"
              value={item.notes}
              onChange={handleChange}
              className="datagrid-modal-textarea"
              placeholder="Type note..."
            />
          </div>
        </div>
        <div className="datagrid-modal-footer">
          <button className="datagrid-modal-save" onClick={handleSubmit}>
            Save Changes <FaCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataGridModal;
