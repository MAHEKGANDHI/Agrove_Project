import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./AdvisoryHub.css";

const AdvisoryHub = () => {
  const [advisories, setAdvisories] = useState([]);
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [formData, setFormData] = useState({
    crop: "",
    soilType: "",
    title: "",
    content: "",
    tips: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterCrop, setFilterCrop] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);

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
    fetchAdvisories();
    const role = localStorage.getItem("userRole");
    setIsAdminMode(role === "admin");
  }, []);

  const fetchAdvisories = async () => {
    try {
      setLoading(true);
      const response = await API.get("/advisories");
      setAdvisories(response.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch advisories", err);
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
    if (!formData.crop || !formData.title || !formData.content) {
      setError("Crop, Title, and Content are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        crop: formData.crop,
        soilType: formData.soilType,
        title: formData.title,
        content: formData.content,
        tips: formData.tips,
        imageUrl: formData.imageUrl,
      };

      if (editingId) {
        await API.put(`/advisories/${editingId}`, payload);
        setEditingId(null);
      } else {
        await API.post("/advisories", payload);
      }
      setFormData({
        crop: "",
        soilType: "",
        title: "",
        content: "",
        tips: "",
        imageUrl: "",
      });
      fetchAdvisories();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save advisory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (advisory) => {
    setFormData({
      crop: advisory.crop,
      soilType: advisory.soilType,
      title: advisory.title,
      content: advisory.content,
      tips: advisory.tips,
      imageUrl: advisory.imageUrl,
    });
    setEditingId(advisory._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advisory?")) {
      try {
        setLoading(true);
        await API.delete(`/advisories/${id}`);
        fetchAdvisories();
        setSelectedAdvisory(null);
        setError("");
      } catch (err) {
        setError("Failed to delete advisory");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      crop: "",
      soilType: "",
      title: "",
      content: "",
      tips: "",
      imageUrl: "",
    });
    setEditingId(null);
    setError("");
  };

  const filteredAdvisories =
    filterCrop === ""
      ? advisories
      : advisories.filter((a) => a.crop === filterCrop);

  return (
    <div className="advisory-hub-container">
      <h2>Agricultural Advisory Hub</h2>

      {isAdminMode && (
        <>
          <form className="advisory-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Edit Advisory" : "Add New Advisory"}</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Crop *</label>
                <select
                  name="crop"
                  value={formData.crop}
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
                <label>Soil Type</label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                >
                  <option value="">Select soil type (optional)</option>
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Best Practices for Maize Cultivation"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write detailed advisory content..."
                rows="6"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Quick Tips</label>
              <textarea
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                placeholder="Separate tips with new lines..."
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingId ? "Update Advisory" : "Add Advisory"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
        </>
      )}

      <div className="advisory-filters">
        <select
          value={filterCrop}
          onChange={(e) => setFilterCrop(e.target.value)}
          className="filter-select"
        >
          <option value="">All Crops</option>
          {crops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      {selectedAdvisory ? (
        <div className="advisory-detail">
          <button
            onClick={() => setSelectedAdvisory(null)}
            className="btn-back"
          >
            ← Back to List
          </button>

          <div className="advisory-detail-content">
            {selectedAdvisory.imageUrl && (
              <img
                src={selectedAdvisory.imageUrl}
                alt={selectedAdvisory.title}
                className="advisory-image"
              />
            )}

            <div className="advisory-detail-header">
              <h3>{selectedAdvisory.title}</h3>
              <div className="advisory-badges">
                <span className="crop-badge">{selectedAdvisory.crop}</span>
                {selectedAdvisory.soilType && (
                  <span className="soil-badge">{selectedAdvisory.soilType}</span>
                )}
              </div>
            </div>

            <div className="advisory-detail-body">
              <h4>Overview</h4>
              <p>{selectedAdvisory.content}</p>

              {selectedAdvisory.tips && (
                <>
                  <h4>Quick Tips</h4>
                  <ul className="tips-list">
                    {selectedAdvisory.tips
                      .split("\n")
                      .filter((tip) => tip.trim())
                      .map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                  </ul>
                </>
              )}
            </div>

            {isAdminMode && (
              <div className="advisory-detail-actions">
                <button
                  onClick={() => handleEdit(selectedAdvisory)}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedAdvisory._id)}
                  className="btn-delete"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="advisories-grid">
          {filteredAdvisories.length === 0 ? (
            <p className="no-data">
              {isAdminMode
                ? "No advisories yet. Create one!"
                : "No advisories available for selected crop."}
            </p>
          ) : (
            filteredAdvisories.map((advisory) => (
              <div key={advisory._id} className="advisory-card">
                {advisory.imageUrl && (
                  <img
                    src={advisory.imageUrl}
                    alt={advisory.title}
                    className="advisory-card-image"
                  />
                )}
                <div className="advisory-card-content">
                  <h4>{advisory.title}</h4>
                  <div className="advisory-badges">
                    <span className="crop-badge">{advisory.crop}</span>
                    {advisory.soilType && (
                      <span className="soil-badge">{advisory.soilType}</span>
                    )}
                  </div>
                  <p className="advisory-excerpt">
                    {advisory.content.substring(0, 100)}...
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAdvisory(advisory)}
                  className="btn-read-more"
                >
                  Read More
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdvisoryHub;
