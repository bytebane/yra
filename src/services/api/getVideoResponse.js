import axiosInstance from './axiosInstance'

export const getVideoResponse = async (videoId) => {
  return await axiosInstance.get('/videos', {
    params: {
      part: 'snippet,statistics',
      id: videoId,
      maxResults: 50,
    },
  })
}

export const getChannelResponse = async (channelId) => {
  return await axiosInstance.get('/channels', {
    params: {
      part: 'snippet,statistics,contentDetails',
      id: channelId,
      maxResults: 50,
    },
  })
}

export const getCommentsResponse = async (videoId) => {
  return await axiosInstance.get('/commentThreads', {
    params: {
      part: 'snippet,replies',
      videoId: videoId,
      maxResults: 50,
    },
  })
}
