const getCachedData = (key) => {
  if (localStorage) return JSON.parse(localStorage.getItem(key)) || []
}

const utils = {
  getCachedData: getCachedData
}

export default utils