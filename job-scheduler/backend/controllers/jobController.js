const { jobs, addJob, removeJob } = require('../models/jobModel');

const getJobs = (req, res) => {
  res.json(jobs);
};

const createJob = (req, res) => {
  const { name, schedule, time } = req.body;

  if (!name || !schedule || !time || isNaN(Number(time.replace(':', '')))) {
    return res.status(400).json({ message: 'Invalid input. Ensure time is in numbers.' });
  }

  const id = Date.now().toString();
  const job = { id, name, schedule, time };
  addJob(job);

  res.status(201).json({ message: 'Job added successfully', job });
};

const deleteJob = (req, res) => {
  const { id } = req.params;

  if (removeJob(id)) {
    res.json({ message: 'Job deleted successfully' });
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
};

module.exports = { getJobs, createJob, deleteJob };
