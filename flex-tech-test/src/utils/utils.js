export const getStatusCounts = (jobs) => {
  const counts = { onRoad: 0, completed: 0, onHold: 0 };

  jobs.forEach((job) => {
    if (job.status === "On Road") {
      counts.onRoad++;
    } else if (job.status === "Completed") {
      counts.completed++;
    } else if (job.status === "On Hold") {
      counts.onHold++;
    }
  });

  return counts;
};
