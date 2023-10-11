import { Avatar, Box, CircularProgress, Typography, useMediaQuery, IconButton } from '@mui/material'
import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import RelatedVideos from '../components/RelatedVideos'
import VideoDetails from '../components/VideoDetails'
import CommentsList from '../components/comments/CommentsList'
import CustomButton, { ButtonTypes } from '../components/CustomButton'
import { useTheme } from '@emotion/react'
import { Download, MoreHoriz, Reply, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeChannelData, storeComments, storeSelectedVideoId } from '../services/redux/actions/dataAction'
import axiosInstance from '../services/api/axiosInstance'
import { toggleLoader } from '../services/redux/actions/baseAction'
import { convertCount } from '../services/others/Converters'

const YoutubePlayer = React.lazy(() => import('react-player/youtube'))

const Watch = () => {
  const params = useParams()

  const theme = useTheme()

  const sizeList = [useMediaQuery('(min-width:684px)'), useMediaQuery('(min-width:1224px)'), useMediaQuery('(min-width:1408px)'), useMediaQuery('(min-width:1734px)'), useMediaQuery('(min-width:1900px)'), useMediaQuery('(min-width:2060px)')]

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.base.isLoading)
  const videoListResponse = useSelector((state) => state.data.videosResponse)
  const channelResponse = useSelector((state) => state.data.channelResponse)

  // Start loading
  useEffect(() => {
    dispatch(toggleLoader())
    dispatch(storeSelectedVideoId(params.videoId))
    axiosInstance
      .get('/channels', {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: videoData.snippet.channelId,
          regionCode: 'IN',
          maxResults: 50,
        },
      })
      .then((res) => {
        dispatch(storeChannelData(res.data.items[0]))
      })
      .then(() => {
        axiosInstance
          .get('/commentThreads', {
            params: {
              part: 'snippet,replies',
              videoId: params.videoId,
              maxResults: 50,
            },
          })
          .then((res) => {
            dispatch(storeComments(res.data.items[0]))
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        dispatch(toggleLoader())
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const videoData = videoListResponse.items.filter((item) => item.id === params.videoId)[0]

  return isLoading ? (
    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  ) : (
    <Box
      component={'section'}
      sx={{ mx: 'auto', width: '92vw', display: 'flex', justifyContent: 'center' }}>
      <Box
        component={'div'}
        className="main-view"
        sx={{ width: `${!sizeList[1] ? '100%' : '70%'}`, objectFit: 'cover', mx: 2, my: 2 }}>
        <Suspense fallback={<CircularProgress />}>
          <YoutubePlayer
            url={`https://www.youtube.com/watch?v=${params.videoId}`}
            controls={true}
            playing={false}
            light={true}
            width="100%"
            height="50vh"
          />
        </Suspense>

        {/* Display Title, Channel Info and Action Buttons */}
        <Box sx={{ mb: 2 }}>
          {/* Title */}
          <Typography
            variant="h5"
            color="text.primary"
            component={'h5'}
            sx={{ my: 1 }}
            gutterBottom>
            {videoData.snippet.title}
          </Typography>
          {/* Channel Info & Action Buttons */}
          {channelResponse.snippet && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {/* Channel Info */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  // src="https://i.pravatar.cc/300"
                  src={channelResponse.snippet.thumbnails.default.url}
                  sx={{ width: '50px', height: '50px', mr: 1 }}
                />
                {/* Channel Name & Subscriber Count */}
                <Box sx={{ mx: 1, mr: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    component={'p'}>
                    {channelResponse.snippet.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component={'p'}>
                    {convertCount(channelResponse.statistics.subscriberCount)} Subscribers
                  </Typography>
                </Box>
                {/* Subscribe Button */}
                <CustomButton
                  buttonType={ButtonTypes.SUBSCRIBE}
                  text="Subscribe"
                  theme={theme}
                  onClick={() => {}}
                />
              </Box>
              {/* Action Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Like Button */}
                <CustomButton
                  startIcon={<ThumbUpOutlined />}
                  text="13K"
                  theme={theme}
                  onClick={() => {}}
                />
                {/* Dislike Button */}
                <CustomButton
                  startIcon={<ThumbDownOutlined />}
                  theme={theme}
                  onClick={() => {}}
                />
                {/* Share Button */}
                <CustomButton
                  startIcon={<Reply sx={{ transform: 'rotateY(180deg)' }} />}
                  text="Share"
                  theme={theme}
                  onClick={() => {}}
                />
                {/* Download Button */}
                <CustomButton
                  startIcon={<Download />}
                  text="Download"
                  onClick={() => {}}
                />
                {/* More Button */}
                <IconButton
                  aria-label="More"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  onClick={() => {}}>
                  <MoreHoriz />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

        {/* VideoDescription */}
        <VideoDetails videoId={params.videoId} />

        {/* For smaller screens display related videos */}
        {!sizeList[1] && (
          <Box
            component={'div'}
            className="side-view"
            sx={{ width: '100%' }}>
            <RelatedVideos videoId={params.videoId} />
          </Box>
        )}

        {/* Comments */}
        <CommentsList commentCount={videoData.statistics.commentCount} />
      </Box>
      {/* For larger screens display related videos */}
      {sizeList[1] && (
        <Box
          component={'div'}
          className="side-view"
          sx={{ width: '30%', mx: 1 }}>
          <RelatedVideos videoId={params.videoId} />
        </Box>
      )}
    </Box>
  )
}

export default Watch
