import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./ActivityLog.css";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    farmId: "",
    activityType: "",
    date: "",
    notes: "",
    quantity: "",
    unit: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterField, setFilterField] = useState("");

  const activityTypes = [
    "Sowing",
    "Irrigation",
    "Fertiliser Application",
    "Pesticide Application",
    "Weeding",
    "Harvest",
    "Land Preparation",
    "Pruning",
  ];

  useEffect(() => {
    fetchActivities();
    fetchFields();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await API.get("/activities");
      setActivities(response.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch activities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await API.get("/farms");
      setFields(response.data.fields || []);
    } catch (err) {
      console.error("Failed to fetch fields", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.farmId ||
      !formData.activityType ||
      !formData.date
    ) {
      setError("Field, Activity Type, and Date are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        farmId: formData.farmId,
        activityType: formData.activityType,
        date: formData.date,
        notes: formData.notes,
        quantity: formData.quantity || null,
        unit: formData.unit || null,
      };

      if (editingId) {
        await API.put(`/activities/${editingId}`, payload);
        setEditingId(null);
      } else {
        await API.post("/activities", payload);
      }
      setFormData({
        farmId: "",
        activityType: "",
        date: "",
        notes: "",
        quantity: "",
        unit: "",
      });
      fetchActivities();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save activity");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      farmId: activity.farmId,
      activityType: activity.activityType,
      date: activity.date.split("T")[0],
      notes: activity.notes,
      quantity: activity.quantity || "",
      unit: activity.unit || "",
    });
    setEditingId(activity._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        setLoading(true);
        await API.delete(`/activities/${id}`);
        fetchActivities();
        setError("");
      } catch (err) {
        setError("Failed to delete activity");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      farmId: "",
      activityType: "",
      date: "",
      notes: "",
      quantity: "",
      unit: "",
    });
    setEditingId(null);
    setError("");
  };

  const filteredActivities =
    filterField === ""
      ? activities
      : activities.filter((a) => a.farmId === filterField);

  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="activity-log-container">
      <h2>Activity & Task Logs</h2>

      <form className="activity-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Field *</label>
            <select
              name="farmId"
              value={formData.farmId}
              onChange={handleInputChange}
            >
              <option value="">Select a field</option>
              {fields.map((field) => (
                <option key={field._id} value={field._id}>
                  {field.fieldName} ({field.mainCrop})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Activity Type *</label>
            <select
              name="activityType"
              value={formData.activityType}
              onChange={handleInputChange}
            >
              <option value="">Select activity type</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="e.g., 50"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              placeholder="e.g., kg, litres, hours"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any relevant details..."
            rows="3"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update Activity" : "Log Activity"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="activity-filters">
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
          className="filter-select"
        >
          <option value="">All Fields</option>
          {fields.map((field) => (
            <option key={field._id} value={field._id}>
              {field.fieldName}
            </option>
          ))}
        </select>
      </div>

      <div className="activities-list">
        {sortedActivities.length === 0 ? (
          <p className="no-data">No activities logged yet. Log your first activity!</p>
        ) : (
          sortedActivities.map((activity) => {
            const fieldName =
              fields.find((f) => f._id === activity.farmId)?.fieldName ||
              "Unknown Field";
            return (
              <div key={activity._id} className="activity-item">
                <div className="activity-item-header">
                  <div>
                    <h4>{activity.activityType}</h4>
                    <p className="field-name">{fieldName}</p>
                  </div>
                  <span className="activity-date">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="activity-item-body">
                  {activity.notes && <p className="notes">{activity.notes}</p>}
                  {activity.quantity && (
                    <p className="quantity">
                      <strong>Quantity:</strong> {activity.quantity} {activity.unit}
                    </p>
                  )}
                </div>
                <div className="activity-item-actions">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="btn-edit"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="btn-delete"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
