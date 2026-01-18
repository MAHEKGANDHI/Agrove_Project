import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./Analytics.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [fields, setFields] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [fieldsRes, activitiesRes] = await Promise.all([
        API.get("/farms"),
        API.get("/activities"),
      ]);
      setFields(fieldsRes.data.fields || []);
      setActivities(activitiesRes.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch analytics data");
      console.error(err);
    }
  };

  // Calculate crop area distribution
  const getCropAreaData = () => {
    const cropMap = {};
    fields.forEach((field) => {
      if (cropMap[field.mainCrop]) {
        cropMap[field.mainCrop] += parseFloat(field.area) || 0;
      } else {
        cropMap[field.mainCrop] = parseFloat(field.area) || 0;
      }
    });

    return Object.entries(cropMap).map(([crop, area]) => ({
      name: crop,
      area: parseFloat(area.toFixed(2)),
    }));
  };

  // Calculate activity timeline
  const getActivityTimeline = () => {
    const timelineMap = {};

    activities.forEach((activity) => {
      const date = new Date(activity.date);
      const monthYear = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      if (timelineMap[monthYear]) {
        timelineMap[monthYear]++;
      } else {
        timelineMap[monthYear] = 1;
      }
    });

    return Object.entries(timelineMap)
      .map(([month, count]) => ({ month, activities: count }))
      .sort((a, b) => {
        const aDate = new Date(a.month);
        const bDate = new Date(b.month);
        return aDate - bDate;
      })
      .slice(-6);
  };

  // Calculate activity type distribution
  const getActivityTypeData = () => {
    const typeMap = {};
    activities.forEach((activity) => {
      if (typeMap[activity.activityType]) {
        typeMap[activity.activityType]++;
      } else {
        typeMap[activity.activityType] = 1;
      }
    });

    return Object.entries(typeMap).map(([type, count]) => ({
      name: type,
      count,
    }));
  };

  // Calculate yield summary by crop
  const getYieldSummary = () => {
    const harvestByField = activities.filter(
      (a) => a.activityType === "Harvest"
    );
    const harvestByCrop = {};

    harvestByField.forEach((harvest) => {
      const field = fields.find((f) => f._id === harvest.farmId);
      if (field) {
        const crop = field.mainCrop;
        if (harvestByCrop[crop]) {
          harvestByCrop[crop].quantity += parseFloat(harvest.quantity) || 0;
          harvestByCrop[crop].area += parseFloat(field.area) || 0;
        } else {
          harvestByCrop[crop] = {
            quantity: parseFloat(harvest.quantity) || 0,
            area: parseFloat(field.area) || 0,
          };
        }
      }
    });

    return Object.entries(harvestByCrop).map(([crop, data]) => ({
      crop,
      quantity: parseFloat(data.quantity.toFixed(2)),
      yieldPerHectare: parseFloat((data.quantity / data.area).toFixed(2)),
    }));
  };

  // Calculate summary statistics
  const getTotalArea = () =>
    fields.reduce((sum, field) => sum + parseFloat(field.area || 0), 0).toFixed(2);

  const getTotalActivities = () => activities.length;

  const getMostUsedCrop = () => {
    if (fields.length === 0) return "N/A";
    const cropMap = {};
    fields.forEach((field) => {
      cropMap[field.mainCrop] = (cropMap[field.mainCrop] || 0) + 1;
    });
    return Object.keys(cropMap).reduce((a, b) =>
      cropMap[a] > cropMap[b] ? a : b
    );
  };

  const COLORS = ["#48bb78", "#4299e1", "#ed8936", "#9f7aea", "#38b2ac", "#ed64a6"];

  const cropAreaData = getCropAreaData();
  const activityTimeline = getActivityTimeline();
  const activityTypeData = getActivityTypeData();
  const yieldSummary = getYieldSummary();

  return (
    <div className="analytics-container">
      <h2>Analytics Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <span className="card-icon">🌾</span>
            <h3>Total Farm Area</h3>
          </div>
          <p className="card-value">{getTotalArea()} ha</p>
          <p className="card-label">Hectares</p>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <span className="card-icon">📋</span>
            <h3>Total Activities</h3>
          </div>
          <p className="card-value">{getTotalActivities()}</p>
          <p className="card-label">Logged activities</p>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <span className="card-icon">🌱</span>
            <h3>Primary Crop</h3>
          </div>
          <p className="card-value">{getMostUsedCrop()}</p>
          <p className="card-label">Most cultivated</p>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <span className="card-icon">📊</span>
            <h3>Total Fields</h3>
          </div>
          <p className="card-value">{fields.length}</p>
          <p className="card-label">Registered fields</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Crop Area Distribution</h3>
          {cropAreaData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropAreaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, area }) => `${name}: ${area}ha`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="area"
                >
                  {cropAreaData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} ha`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No crop data available</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Activity Timeline (Last 6 Months)</h3>
          {activityTimeline.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activities"
                  stroke="#4299e1"
                  strokeWidth={2}
                  dot={{ fill: "#4299e1", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No activity data available</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Activity Type Distribution</h3>
          {activityTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ed8936" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No activity type data available</p>
          )}
        </div>

        <div className="chart-container">
          <h3>Yield Summary</h3>
          {yieldSummary.length > 0 ? (
            <div className="yield-table">
              <table>
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Total Yield (units)</th>
                    <th>Yield per Hectare</th>
                  </tr>
                </thead>
                <tbody>
                  {yieldSummary.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.crop}</td>
                      <td>{item.quantity}</td>
                      <td>{item.yieldPerHectare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No harvest data available</p>
          )}
        </div>
      </div>

      <div className="insights-section">
        <h3>Key Insights</h3>
        <div className="insights-grid">
          {cropAreaData.length > 0 && (
            <div className="insight-card">
              <h4>Largest Field</h4>
              <p>
                {cropAreaData.reduce((prev, current) =>
                  prev.area > current.area ? prev : current
                ).name}{" "}
                with{" "}
                {cropAreaData.reduce((prev, current) =>
                  prev.area > current.area ? prev : current
                ).area}{" "}
                hectares
              </p>
            </div>
          )}
          {activities.length > 0 && (
            <div className="insight-card">
              <h4>Most Active Period</h4>
              <p>
                {activityTimeline.length > 0
                  ? `${activityTimeline.reduce((prev, current) =>
                      prev.activities > current.activities ? prev : current
                    ).month} with most activities`
                  : "No data available"}
              </p>
            </div>
          )}
          {activityTypeData.length > 0 && (
            <div className="insight-card">
              <h4>Most Frequent Activity</h4>
              <p>
                {activityTypeData.reduce((prev, current) =>
                  prev.count > current.count ? prev : current
                ).name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
