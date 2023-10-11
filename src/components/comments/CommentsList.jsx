import { ArrowDropDown, Sort } from '@mui/icons-material'
import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import CommentListItem from './CommentListItem'

import { useSelector } from 'react-redux'

const CommentsList = ({ commentCount }) => {
  const commentsResponse = useSelector((state) => state.data.commentsResponse)
  const [loadReplies, setLoadReplies] = React.useState(false)

  console.log(commentsResponse)

  const theme = useTheme()
  return (
    <Box>
      {/* Heading & Sort Button */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          color="text.primary"
          component={'h5'}
          sx={{ my: 1 }}
          gutterBottom>
          {commentCount} Comments
        </Typography>
        <button
          type="button"
          style={{ display: 'flex', alignItems: 'center', marginLeft: '1.25rem', borderRadius: 3, background: 'none', color: theme.palette.text.primary, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
          <Sort
            sx={{
              color: 'inherit',
            }}
          />
          Sort by
        </button>
      </Box>
      {/* Comments */}
      <>
        {/* Map Comments */}
        {commentsResponse.snippet && (
          <Box
            display={'flex'}
            sx={{ color: theme.palette.text.primary }}>
            <CommentListItem
              authorName={commentsResponse.snippet.topLevelComment.snippet.authorDisplayName}
              authorChannelUrl={commentsResponse.snippet.topLevelComment.snippet.authorChannelUrl}
              thumbnail={commentsResponse.snippet.topLevelComment.snippet.authorProfileImageUrl}
              commentId={commentsResponse.snippet.topLevelComment.id}
              comment={commentsResponse.snippet.topLevelComment.snippet.textDisplay}
              likes={commentsResponse.snippet.topLevelComment.snippet.likeCount}
              publishTime={commentsResponse.snippet.topLevelComment.snippet.publishedAt}
              totalReplies={commentsResponse.snippet.totalReplyCount}>
              {/* Load Replies Button*/}
              {commentsResponse.snippet && commentsResponse.snippet.totalReplyCount > 0 && (
                <Button
                  variant="text"
                  sx={{ borderRadius: '3rem', textTransform: 'lowercase' }}
                  startIcon={<ArrowDropDown />}
                  onClick={() => setLoadReplies(!loadReplies)}>
                  {commentsResponse.snippet.totalReplyCount} replies
                </Button>
              )}
            </CommentListItem>
            {/* Load Replies to Comment */}
            {loadReplies &&
              commentsResponse.replies &&
              commentsResponse.replies.comments.map((comment, index) => {
                return (
                  <CommentListItem
                    key={index}
                    authorName={comment.snippet.authorDisplayName}
                    authorChannelUrl={comment.snippet.authorChannelUrl}
                    thumbnail={comment.snippet.authorProfileImageUrl}
                    commentId={comment.id}
                    comment={comment.snippet.textDisplay}
                    likes={comment.snippet.likeCount}
                    publishTime={comment.snippet.publishedAt}
                    totalReplies={comment.snippet.totalReplyCount}
                    replies={comment.replies.comments}
                  />
                )
              })}
          </Box>
        )}
      </>
    </Box>
  )
}

export default CommentsList
