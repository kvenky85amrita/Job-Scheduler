import React, { useState, useEffect } from 'react';

function App() {
  const [jobs, setJobs] = useState([]); 
  const [name, setName] = useState(''); 
  const [schedule, setSchedule] = useState('hourly'); 
  const [time, setTime] = useState(''); 

  
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);


  const addJob = () => {
    const newJob = { name, schedule, time };
    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs((prevJobs) => [...prevJobs, data.job]);
        setName('');
        setTime('');
        setSchedule('hourly');
      })
      .catch((error) => console.error('Error adding job:', error));
  };


  const deleteJob = (id) => {
    fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' })
      .then(() => {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      })
      .catch((error) => console.error('Error deleting job:', error));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Job Scheduler</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Create Job</h2>
        <input
          type="text"
          placeholder="Job Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '5px', marginRight: '10px', width: '200px' }}
        />
        <select
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <input
          type="text"
          placeholder="Time (e.g., 15 or 14:00)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ padding: '5px', marginRight: '10px', width: '150px' }}
        />
        <button
          onClick={addJob}
          style={{
            padding: '5px 10px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add Job
        </button>
      </div>

      <div>
        <h2>Scheduled Jobs</h2>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job.id} style={{ marginBottom: '10px' }}>
                <strong>{job.name}</strong> - {job.schedule} - {job.time}{' '}
                <button
                  onClick={() => deleteJob(job.id)}
                  style={{
                    padding: '3px 5px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs scheduled yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
