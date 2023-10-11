import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  timeout: 1000,
  params: {
    key: process.env.REACT_APP_API_KEY,
  },
})

export default axiosInstance
