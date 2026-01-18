import React, { useState, useEffect } from "react";
import API from "../services/api";
import "./DataExport.css";

const DataExport = () => {
  const [fields, setFields] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [fieldsRes, activitiesRes] = await Promise.all([
        API.get("/farms"),
        API.get("/activities"),
      ]);
      setFields(fieldsRes.data.fields || []);
      setActivities(activitiesRes.data || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch data for export");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prepareFieldsCSV = () => {
    if (fields.length === 0) return null;

    const headers = ["Field Name", "Area (ha)", "Main Crop", "Soil Type"];
    const rows = fields.map((f) => [f.fieldName, f.area, f.mainCrop, f.soilType]);

    return { headers, rows };
  };

  const prepareActivitiesCSV = () => {
    let data = activities;

    if (selectedField) {
      data = data.filter((a) => a.farmId === selectedField);
    }

    if (dateFrom) {
      data = data.filter((a) => new Date(a.date) >= new Date(dateFrom));
    }

    if (dateTo) {
      data = data.filter((a) => new Date(a.date) <= new Date(dateTo));
    }

    if (data.length === 0) return null;

    const headers = [
      "Date",
      "Field",
      "Activity Type",
      "Quantity",
      "Unit",
      "Notes",
    ];

    const rows = data.map((a) => {
      const fieldName =
        fields.find((f) => f._id === a.farmId)?.fieldName || "Unknown";
      return [
        new Date(a.date).toLocaleDateString(),
        fieldName,
        a.activityType,
        a.quantity || "",
        a.unit || "",
        a.notes || "",
      ];
    });

    return { headers, rows };
  };

  const exportToCSV = (csvData, filename) => {
    if (!csvData) {
      setError("No data available to export");
      return;
    }

    const { headers, rows } = csvData;

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => {
            // Escape cells with commas or quotes
            if (typeof cell === "string" && (cell.includes(",") || cell.includes('"'))) {
              return `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          })
          .join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccessMessage(`${filename}.csv downloaded successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleExportFields = () => {
    const csvData = prepareFieldsCSV();
    if (csvData) {
      exportToCSV(csvData, `agrove_fields_${new Date().toISOString().split("T")[0]}`);
    } else {
      setError("No fields to export");
    }
  };

  const handleExportActivities = () => {
    const csvData = prepareActivitiesCSV();
    if (csvData) {
      exportToCSV(csvData, `agrove_activities_${new Date().toISOString().split("T")[0]}`);
    } else {
      setError("No activities to export with current filters");
    }
  };

  const handleExportAll = () => {
    // Combine both exports
    const fieldsCSV = prepareFieldsCSV();
    const activitiesCSV = prepareActivitiesCSV();

    if (fieldsCSV && activitiesCSV) {
      // Export fields first
      exportToCSV(fieldsCSV, `agrove_fields_${new Date().toISOString().split("T")[0]}`);
      // Export activities after a small delay
      setTimeout(() => {
        exportToCSV(
          activitiesCSV,
          `agrove_activities_${new Date().toISOString().split("T")[0]}`
        );
      }, 500);
    } else {
      setError("Insufficient data to export");
    }
  };

  return (
    <div className="export-container">
      <h2>Data Export</h2>

      <div className="export-intro">
        <p>
          Download your farm records and activity logs as CSV files for backup,
          reporting, or offline use.
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="export-cards">
        <div className="export-card">
          <div className="card-header">
            <h3>🌾 Export Field Records</h3>
            <p className="card-count">{fields.length} fields</p>
          </div>
          <div className="card-body">
            <p>Export all your registered fields including area, crop type, and soil information.</p>
            <button
              onClick={handleExportFields}
              disabled={loading || fields.length === 0}
              className="btn-export"
            >
              {loading ? "Processing..." : "Export Fields"}
            </button>
          </div>
        </div>

        <div className="export-card">
          <div className="card-header">
            <h3>📋 Export Activity Logs</h3>
            <p className="card-count">{activities.length} activities</p>
          </div>
          <div className="card-body">
            <p>Export activity logs with detailed filters for specific time periods or fields.</p>

            <div className="filter-group">
              <div className="filter-item">
                <label>Filter by Field:</label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="">All Fields</option>
                  {fields.map((field) => (
                    <option key={field._id} value={field._id}>
                      {field.fieldName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-item">
                <label>Date Range:</label>
                <div className="date-inputs">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From"
                  />
                  <span className="to-label">to</span>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleExportActivities}
              disabled={loading || activities.length === 0}
              className="btn-export"
            >
              {loading ? "Processing..." : "Export Activities"}
            </button>
          </div>
        </div>

        <div className="export-card">
          <div className="card-header">
            <h3>📊 Export All Data</h3>
            <p className="card-count">Complete backup</p>
          </div>
          <div className="card-body">
            <p>Export all your farm data including fields and complete activity history.</p>
            <button
              onClick={handleExportAll}
              disabled={loading || (fields.length === 0 && activities.length === 0)}
              className="btn-export btn-primary"
            >
              {loading ? "Processing..." : "Export All"}
            </button>
          </div>
        </div>
      </div>

      <div className="export-help">
        <h3>About CSV Export</h3>
        <div className="help-content">
          <div className="help-item">
            <h4>What is CSV?</h4>
            <p>
              CSV (Comma-Separated Values) is a simple text format compatible with
              spreadsheet applications like Microsoft Excel, Google Sheets, and LibreOffice.
            </p>
          </div>
          <div className="help-item">
            <h4>How to Use</h4>
            <ol>
              <li>Click an export button above</li>
              <li>Your browser will download the CSV file</li>
              <li>Open it with Excel or Google Sheets for editing</li>
              <li>Save your modified data for backup or reporting</li>
            </ol>
          </div>
          <div className="help-item">
            <h4>Tips</h4>
            <ul>
              <li>Use activity filters to export specific records</li>
              <li>Keep regular backups of your data</li>
              <li>Use date ranges to export seasonal reports</li>
              <li>Share exported CSVs with team members or agronomists</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="export-stats">
        <h3>Export Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-label">Registered Fields</p>
            <p className="stat-value">{fields.length}</p>
          </div>
          <div className="stat-item">
            <p className="stat-label">Logged Activities</p>
            <p className="stat-value">{activities.length}</p>
          </div>
          <div className="stat-item">
            <p className="stat-label">Total Farm Area</p>
            <p className="stat-value">
              {fields
                .reduce((sum, f) => sum + (parseFloat(f.area) || 0), 0)
                .toFixed(2)}{" "}
              ha
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExport;
