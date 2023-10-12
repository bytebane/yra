import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import { convertDateToRelativeTime, convertCount } from '../../services/others/Converters'
import { Link } from 'react-router-dom'

// TODO: Minor Fix
const VideoCardListItem = ({ videoId, title, thumbnail, channelTitle, viewsCount, uploadedAt }) => {
  return (
    <Box sx={{ width: '100%', height: '126px', mb: 2 }}>
      <Link
        to={`/watch/${videoId}`}
        onClick={() => {
          // window.reload()
          window.scrollTo(0, 0)
        }}
        style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          {/* Image */}
          <CardMedia
            component="img"
            image={thumbnail}
            sx={{
              width: '180px',
              height: '120px',
            }}
            alt={title}
            loading="lazy"
          />
          <CardContent sx={{ height: '96%', maxWidth: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Title */}
            <Typography
              component="div"
              variant="body2"
              gutterBottom
              sx={{
                p: 0,
                m: 0,
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
              {title}
            </Typography>
            {/* Channel */}
            <Typography
              component="p"
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}>
              {channelTitle}
            </Typography>
            {/* Views & Date */}
            <Typography
              component="p"
              variant="overline"
              color="text.secondary"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}>
              {viewsCount && convertCount(viewsCount) + ' views  • '}
              {convertDateToRelativeTime(uploadedAt)}
            </Typography>
          </CardContent>
        </Box>
      </Link>
    </Box>
  )
}

export default VideoCardListItem
