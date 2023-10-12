import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { convertDateToRelativeTime, convertCount } from '../../services/others/Converters'
import { Link } from 'react-router-dom'

const VideoCardGrid = ({ videoId, title, thumbnail, channelTitle, viewsCount, uploadedAt }) => {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Link
        to={`/watch/${videoId}`}
        style={{
          textDecoration: 'none',

          // color: theme.palette.primary.contrastText
        }}>
        <CardActionArea>
          {/* Image */}
          <CardMedia
            component="img"
            image={thumbnail}
            alt={title}
            loading="lazy"
          />
          <CardContent>
            {/* Title */}
            <Typography
              component="div"
              variant="h5"
              gutterBottom
              sx={{
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
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
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default VideoCardGrid
