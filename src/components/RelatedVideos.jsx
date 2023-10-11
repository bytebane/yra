import { List } from '@mui/material'
import React from 'react'
import VideoCard from './videoCards/VCListItem'
import { useSelector } from 'react-redux'

const RelatedVideos = ({ videoId }) => {
  const videosList = useSelector((state) => state.data.videosResponse)
  return (
    <List sx={{ width: '100%' }}>
      {/* Filtering out current video from the list and map the rest */}
      {videosList.items
        .filter((video) => video.id !== videoId)
        .map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.id}
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails.high.url}
            channelTitle={video.snippet.channelTitle}
            viewsCount={video.statistics.viewCount}
            uploadedAt={video.snippet.publishedAt}
          />
        ))}
    </List>
  )
}

export default RelatedVideos
