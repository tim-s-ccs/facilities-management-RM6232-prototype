const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const formatDate = (date: Date): string => {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

export default formatDate