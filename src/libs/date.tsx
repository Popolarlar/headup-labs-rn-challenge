const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export function formatDate(dateString: string) {
  const d = new Date(dateString)
  const year = d.getFullYear()
  const date = d.getDate()
  const monthIndex = d.getMonth()
  const monthName = months[monthIndex]
  const formatted = `${date} ${monthName} ${year}`
  return formatted
}