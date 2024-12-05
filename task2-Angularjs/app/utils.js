// Get Formatted Date
function getFormattedDate() {
  const now = new Date();
  return formatDate(now);
}

// Get Due Date
function getDueDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}

// Format Date
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`;
}
