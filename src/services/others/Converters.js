//! Convert date to relative time
/**
 * Converts a date string to relative time format.
 * @param {string} dateString - The date string to convert.
 * @returns {string} The relative time format(* days ago, * hours ago, etc).
 */
export const convertDateToRelativeTime = (dateString) => {
  const date = new Date(dateString)

  const now = new Date()
  const difference = now - date

  const seconds = Math.floor(difference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  let unit
  let number

  if (weeks > 0) {
    unit = weeks > 1 ? 'weeks' : 'week'
    number = weeks
  } else if (days > 0) {
    unit = days > 1 ? 'days' : 'day'
    number = days
  } else if (hours > 0) {
    unit = hours > 1 ? 'hours' : 'hour'
    number = hours
  } else if (minutes > 0) {
    unit = minutes > 1 ? 'minutes' : 'minute'
    number = minutes
  } else {
    unit = 'seconds'
    number = seconds
  }

  return `${number} ${unit} ago`
}

//! Convert viewCount to human readable(K=1000, M=1000000)
/**
 * Converts a view count to a human-readable format.
 * @param {number} viewCount - The view count to convert.
 * @returns {string} The human-readable format.
 */
export function convertCount(viewCount) {
  const K = 1000
  const M = 1000000
  if (viewCount < K) {
    return `${viewCount}`
  }
  if (viewCount < M) {
    return `${(viewCount / K).toFixed(1)} K`
  }
  return `${(viewCount / M).toFixed(1)} M`
}
