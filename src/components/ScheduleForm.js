import React, { useState } from "react";

function ScheduleForm({ addJob }) {
  const [jobName, setJobName] = useState("");
  const [schedule, setSchedule] = useState("hourly");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobName || !time) return;
    addJob({ jobName, schedule, time });
    setJobName("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>Add a New Job</h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Job Name</label>
        <input
          type="text"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Schedule Type</label>
        <select
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          placeholder="e.g., 30 or 14:00"
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Job
      </button>
    </form>
  );
}

export default ScheduleForm;
