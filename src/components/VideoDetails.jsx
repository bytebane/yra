import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'

const VideoDetails = ({ videoId }) => {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState(false)

  const videoResponse = useSelector((state) => state.data.videoResponse)

  return (
    <Card
      sx={{
        borderRadius: 3,
        pb: 1,
      }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          p: 1,
        }}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{
            fontWeight: 'bold',
          }}>
          51,786 views Apr 29, 2022
        </Typography>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: !expanded && 3,
            mt: 2,
            textDecoration: 'none',
            whiteSpace: 'pre-line',
          }}
          dangerouslySetInnerHTML={{
            __html: videoResponse.items[0].snippet.description
              .replace(/#(\w+)/g, '<a class="hashtag" href="tag/$1">#$1</a>')
              // eslint-disable-next-line no-useless-escape
              .replace(/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/gi, '<a target="_blank" href="$1">$1</a>'),
          }}></Typography>

        <button
          style={{ display: 'inline-block', borderRadius: 3, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: theme.palette.text.primary, float: 'right' }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? '...Show less' : '...Show more'}
        </button>
      </Box>
    </Card>
  )
}

export default VideoDetails
