const jobs = [];
const scheduledJobs = {};

const addJob = (job) => {
  jobs.push(job);
  scheduleJob(job);
};

const removeJob = (id) => {
  const index = jobs.findIndex((job) => job.id === id);
  if (index !== -1) {
    clearInterval(scheduledJobs[id]);
    delete scheduledJobs[id];
    jobs.splice(index, 1);
    return true;
  }
  return false;
};

const scheduleJob = (job) => {
  if (job.schedule === 'hourly') {
    const interval = setInterval(() => {
      const currentMinute = new Date().getMinutes();
      if (currentMinute === Number(job.time)) {
        console.log(`Job "${job.name}" executed: Hello World`);
      }
    }, 60 * 1000);
    scheduledJobs[job.id] = interval;
  } else if (job.schedule === 'daily') {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${now.getMinutes()}`;
      if (currentTime === job.time) {
        console.log(`Job "${job.name}" executed: Hello World`);
      }
    }, 60 * 1000);
    scheduledJobs[job.id] = interval;
  }
};

module.exports = { jobs, addJob, removeJob };
