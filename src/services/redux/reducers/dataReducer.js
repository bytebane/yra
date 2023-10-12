import { STORE_DATA } from '../actions/actionTypes'

const dataState = {
  videoResponse: {},
  videosResponse: {},
  channelResponse: {},
  commentsResponse: {},
  selectedVideoId: '',
}

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case STORE_DATA.VIDEODATA:
      return {
        ...state,
        videoResponse: action.payload,
      }
    case STORE_DATA.VIDEOSDATA:
      return {
        ...state,
        videosResponse: action.payload,
      }
    case STORE_DATA.CHANNELDATA:
      return {
        ...state,
        channelResponse: action.payload,
      }
    case STORE_DATA.COMMENTS:
      return {
        ...state,
        commentsResponse: action.payload,
      }
    case STORE_DATA.SELECTEDVIDEOID:
      return {
        ...state,
        selectedVideoId: action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
