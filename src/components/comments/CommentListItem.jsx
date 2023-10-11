import React from 'react'
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material'
import { Avatar, Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { convertDateToRelativeTime } from '../../services/others/Converters'
import { useSelector } from 'react-redux'

const CommentListItem = ({ children, authorName, authorChannelUrl, thumbnail, commentId, comment, likes, publishTime, totalReplies = 0, replies = [] }) => {
  const isLoading = useSelector((state) => state.base.isLoading)
  const theme = useTheme()
  return isLoading ? (
    <></>
  ) : (
    <>
      <Avatar
        src={thumbnail ?? 'https://i.pravatar.cc/500'}
        sx={{ width: '50px', height: '50px', mr: 1 }}
      />
      {/* Comment Rows */}

      <Box>
        {/* Comment Row1 */}
        <Box>
          <Typography>{authorName}</Typography>
          <Typography>{convertDateToRelativeTime(publishTime)}</Typography>
        </Box>
        {/* Comment Row2 */}
        <Typography
          variant="body2"
          color="inherit"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4,
          }}
          dangerouslySetInnerHTML={{ __html: comment ?? '&#39;s <a href="http://www.youtube.com/results?search_query=%23leo">#LEO</a><br>Telugu -&gt; <a href="https://youtu.be/ozRCVFgsrbY">https://youtu.be/ozRCVFgsrbY</a><br>Kannada -&gt; <a href="https://youtu.be/QnknmoU94a8">https://youtu.be/QnknmoU94a8</a>' }}></Typography>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: theme.palette.text.primary, float: 'right' }}
          onClick={() => {}}>
          {'...Show less'}
        </button>
        {/* Comment Row3 */}
        <Box display={'flex center'}>
          <Tooltip title="Like">
            <IconButton>
              <ThumbUpOutlined sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Tooltip>
          <Typography
            component={'span'}
            variant="subtitle2"
            sx={{
              color: theme.palette.text.primary,
            }}>
            {likes}
          </Typography>
          <Tooltip title="DisLike">
            <IconButton>
              <ThumbDownOutlined sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply">
            <button style={{ marginLeft: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: theme.palette.text.primary, float: 'right' }}>Reply</button>
          </Tooltip>
        </Box>
        {children}
      </Box>
    </>
  )
}

export default CommentListItem
