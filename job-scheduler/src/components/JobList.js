import React, { useEffect } from "react";

function JobList({ jobs, removeJob }) {
  useEffect(() => {
    const timers = jobs.map((job) => {
      if (job.schedule === "hourly") {
        const interval = setInterval(() => {
          console.log(`${job.jobName}: Hello World`);
        }, 60 * 1000);
        return () => clearInterval(interval);
      }
      return null;
    });

    return () => timers.forEach((clear) => clear && clear());
  }, [jobs]);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: "0 0 20px 0", fontSize: "18px" }}>Scheduled Jobs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map((job) => (
          <li
            key={job.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>
              <strong>{job.jobName}</strong> - {job.schedule} at {job.time}
            </div>
            <button
              onClick={() => removeJob(job.id)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
