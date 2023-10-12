import { STORE_DATA } from './actionTypes'

export const storeVideoData = (payload) => {
  return {
    type: STORE_DATA.VIDEODATA,
    payload: payload,
  }
}
export const storeVideosData = (payload) => {
  return {
    type: STORE_DATA.VIDEOSDATA,
    payload: payload,
  }
}

export const storeChannelData = (payload) => {
  return {
    type: STORE_DATA.CHANNELDATA,
    payload: payload,
  }
}

export const storeComments = (payload) => {
  return {
    type: STORE_DATA.COMMENTS,
    payload: payload,
  }
}

export const storeSelectedVideoId = (payload) => {
  return {
    type: STORE_DATA.SELECTEDVIDEOID,
    payload: payload,
  }
}
