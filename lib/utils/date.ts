export function formatDate(dateString = '2021-08-19T00:00:00.000Z') {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatDueDate(startDate = '2021-08-19T00:00:00.000Z', days = 1) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + days);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
