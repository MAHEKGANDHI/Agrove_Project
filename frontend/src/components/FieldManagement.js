import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./FieldManagement.css";

const FieldManagement = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    fieldName: "",
    area: "",
    mainCrop: "",
    soilType: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const crops = [
    "Maize",
    "Wheat",
    "Rice",
    "Beans",
    "Tomato",
    "Cabbage",
    "Potato",
    "Carrots",
  ];
  const soilTypes = [
    "Loamy",
    "Sandy",
    "Clay",
    "Silty",
    "Peat",
    "Chalky",
  ];

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const response = await API.get("/farms");
      setFields(response.data.fields || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch fields");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fieldName || !formData.area || !formData.mainCrop || !formData.soilType) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await API.put(`/farms/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/farms", formData);
      }
      setFormData({ fieldName: "", area: "", mainCrop: "", soilType: "" });
      fetchFields();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save field");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setFormData(field);
    setEditingId(field._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      try {
        setLoading(true);
        await API.delete(`/farms/${id}`);
        fetchFields();
        setError("");
      } catch (err) {
        setError("Failed to delete field");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ fieldName: "", area: "", mainCrop: "", soilType: "" });
    setEditingId(null);
    setError("");
  };

  return (
    <div className="field-management-container">
      <h2>Field Management</h2>

      <form className="field-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Field Name *</label>
          <input
            type="text"
            name="fieldName"
            value={formData.fieldName}
            onChange={handleInputChange}
            placeholder="e.g., North Field"
          />
        </div>

        <div className="form-group">
          <label>Area (Hectares) *</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            placeholder="e.g., 5.5"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Main Crop *</label>
          <select
            name="mainCrop"
            value={formData.mainCrop}
            onChange={handleInputChange}
          >
            <option value="">Select a crop</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Soil Type *</label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleInputChange}
          >
            <option value="">Select soil type</option>
            {soilTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Field" : "Add Field"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="fields-grid">
        {fields.length === 0 ? (
          <p className="no-data">No fields registered yet. Add your first field!</p>
        ) : (
          fields.map((field) => (
            <div key={field._id} className="field-card">
              <div className="field-card-header">
                <h3>{field.fieldName}</h3>
                <span className="crop-badge">{field.mainCrop}</span>
              </div>
              <div className="field-card-body">
                <p>
                  <strong>Area:</strong> {field.area} hectares
                </p>
                <p>
                  <strong>Soil Type:</strong> {field.soilType}
                </p>
              </div>
              <div className="field-card-actions">
                <button
                  onClick={() => handleEdit(field)}
                  className="btn-edit"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(field._id)}
                  className="btn-delete"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FieldManagement;
