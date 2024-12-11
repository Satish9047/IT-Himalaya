/**
 * @description  Get Current Date
 * @returns     "Date" format of YYYY/MM/DD-HH:MM:SS
 */
function getFormattedDate() {
  const now = new Date();
  return formatDate(now);
}

/**
 * @description  Get Due Date 1 day from now
 * @returns      "Date" format of YYYY/MM/DD-HH:MM:SS
 */
function getDueDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return formatDate(now);
}

/**
 *@description  Format the date to YYYY/MM/DD-HH:MM:SS
 * @param       Date
 * @returns     "Date" format of YYYY/MM/DD-HH:MM:SS
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const seconds = String(date.getSeconds());

  return `${year}/${month}/${day}-${hours}:${minutes}:${seconds}`;
}
