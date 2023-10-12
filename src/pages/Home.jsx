import React from 'react'

import { CircularProgress, ImageList, useMediaQuery } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { storeVideosData } from '../services/redux/actions/dataAction'
import { toggleLoader } from '../services/redux/actions/baseAction'

import VideoCard from '../components/videoCards/VCGridItem'
import getVideosResponse from '../services/api/getVideosResponse'

const Home = () => {
  const isLoading = useSelector((state) => state.base.isLoading)

  const dispatch = useDispatch()
  const rdxVideosData = useSelector((state) => state.data.videosResponse)

  React.useEffect(() => {
    // ! Retrieve data from API and store in redux and local storage
    // ? Storing in local storage just to reduce the number of API calls and redux for better performance and reusability
    // * Checking if data exists in redux if not check if data exists in local storage if not fetch data from API and store in redux and local storage
    if (!rdxVideosData.items && localStorage.getItem('videosData')) {
      dispatch(storeVideosData(JSON.parse(localStorage.getItem('videosData'))))
    } else {
      // * Set Loading state

      dispatch(toggleLoader())

      // * Fetching data from API
      getVideosResponse()
        .then((res) => {
          dispatch(storeVideosData(res.data))
          localStorage.setItem('videosData', JSON.stringify(res.data))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch(toggleLoader())
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // * ViewPort Size List
  const sizeList = [useMediaQuery('(min-width:684px)'), useMediaQuery('(min-width:1224px)'), useMediaQuery('(min-width:1408px)'), useMediaQuery('(min-width:1734px)'), useMediaQuery('(min-width:1900px)'), useMediaQuery('(min-width:2060px)')]

  return (
    <section style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      {isLoading ? (
        <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
      ) : (
        <ImageList
          sx={{
            mx: 2,
            '& .MuiPaper-root': {
              backgroundImage: 'none',
            },
          }}
          cols={sizeList[5] ? 6 : sizeList[4] ? 5 : sizeList[3] ? 4 : sizeList[1] ? 3 : sizeList[0] ? 2 : 1}
          gap={25}>
          {rdxVideosData.items?.length > 0 &&
            rdxVideosData.items.map((video) => (
              <VideoCard
                key={video.id.videoId ?? video.id}
                videoId={video.id.videoId ?? video.id}
                title={video.snippet.title}
                thumbnail={video.snippet.thumbnails.high.url}
                channelTitle={video.snippet.channelTitle}
                viewsCount={video.statistics && video.statistics.viewCount}
                uploadedAt={video.snippet.publishedAt}
              />
            ))}
        </ImageList>
      )}
    </section>
  )
}

export default Home
