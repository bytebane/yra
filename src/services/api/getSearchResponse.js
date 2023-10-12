import axiosInstance from './axiosInstance'

const getSearchResponse = async (searchTerm) => {
  return await axiosInstance.get('/search', {
    params: {
      part: 'snippet',
      q: searchTerm,
      maxResults: 50,
    },
  })
}

export default getSearchResponse
