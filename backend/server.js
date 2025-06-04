const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());

let jobs = [];
let jobIdCounter = 1;

app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const { name, schedule, time } = req.body;
  const newJob = { id: jobIdCounter++, name, schedule, time };
  jobs.push(newJob);
  res.status(201).json({ job: newJob });
});

app.delete('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  jobs = jobs.filter((job) => job.id !== jobId);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
