import axiosInstance from './axiosInstance'

const getVideosResponse = async () => {
  return await axiosInstance.get('/videos', {
    params: {
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode: 'IN',
      maxResults: 50,
    },
  })
}

export default getVideosResponse
