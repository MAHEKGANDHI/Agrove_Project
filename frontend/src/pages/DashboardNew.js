import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2, FiLoader } from "react-icons/fi";
import API from "../services/api";
import { showSuccess, showError } from "../services/toast";

export default function DashboardNew() {
  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [formData, setFormData] = useState({ farmName: "", location: "", totalArea: "", soilType: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await API.get("/farms", {
        headers: { Authorization: token }
      });
      setFarms(res.data || []);
    } catch (err) {
      showError("Failed to load farms");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFarm = async (e) => {
    e.preventDefault();
    if (!formData.farmName || !formData.totalArea) {
      showError("Please fill in required fields");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (editingFarm) {
        await API.put(`/farms/${editingFarm._id}`, formData, {
          headers: { Authorization: token }
        });
        showSuccess("Farm updated successfully");
      } else {
        await API.post("/farms", formData, {
          headers: { Authorization: token }
        });
        showSuccess("Farm created successfully");
      }
      setShowModal(false);
      setFormData({ farmName: "", location: "", totalArea: "", soilType: "" });
      setEditingFarm(null);
      fetchFarms();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save farm");
    }
  };

  const handleDeleteFarm = async (farmId) => {
    if (!window.confirm("Are you sure you want to delete this farm?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/farms/${farmId}`, {
        headers: { Authorization: token }
      });
      showSuccess("Farm deleted successfully");
      fetchFarms();
    } catch (err) {
      showError("Failed to delete farm");
    }
  };

  const openEditModal = (farm) => {
    setEditingFarm(farm);
    setFormData({
      farmName: farm.farmName,
      location: farm.location || "",
      totalArea: farm.totalArea,
      soilType: farm.soilType || ""
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFarm(null);
    setFormData({ farmName: "", location: "", totalArea: "", soilType: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Farms</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all your farms and fields</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <FiPlus size={20} />
              <span>Add Farm</span>
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <FiLoader className="animate-spin text-agro-green dark:text-agro-light" size={40} />
            </div>
          )}

          {/* Farms Grid */}
          {!isLoading && farms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms.map((farm) => (
                <div key={farm._id} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{farm.farmName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{farm.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-agro-light text-white rounded-full text-xs font-semibold">
                      {farm.status || "Active"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Area:</strong> {farm.totalArea} hectares
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Soil Type:</strong> {farm.soilType || "Not specified"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Fields:</strong> {farm.fields?.length || 0}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(farm)}
                      className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                    >
                      <FiEdit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteFarm(farm._id)}
                      className="flex-1 btn-danger flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && farms.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">No farms yet. Create your first farm!</p>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <FiPlus size={20} />
                <span>Create Farm</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {editingFarm ? "Edit Farm" : "Add New Farm"}
              </h2>

              <form onSubmit={handleSaveFarm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Farm Name *
                  </label>
                  <input
                    type="text"
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="input-field"
                    placeholder="Enter farm name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Area (hectares) *
                  </label>
                  <input
                    type="number"
                    value={formData.totalArea}
                    onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })}
                    className="input-field"
                    placeholder="Enter total area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Soil Type
                  </label>
                  <select
                    value={formData.soilType}
                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select soil type</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Clay">Clay</option>
                    <option value="Silty">Silty</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="flex-1 btn-primary">
                    {editingFarm ? "Update Farm" : "Create Farm"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
