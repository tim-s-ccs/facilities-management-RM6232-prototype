import formatDate from './formatDate'

const hourToTwelveHour = (hour: number): number => {
  const twelveHour = hour % 12

  if (twelveHour === 0) {
    return 12
  } else {
    return twelveHour
  }
}

const amOrPm = (hour: number): string => {
  if (hour <= 12) {
    return 'am'
  } else {
    return 'pm'
  }
}

const formatDateTime = (date: Date): string => {
  return `${formatDate(date)}, ${hourToTwelveHour(date.getHours())}:${('0' + date.getMinutes()).slice(-2)}${amOrPm(date.getHours())}`
}

export default formatDateTime