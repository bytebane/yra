import { useTheme } from '@emotion/react'
import { Button, useMediaQuery } from '@mui/material'

// enum ButtonTypes
export const ButtonTypes = Object.freeze({
  PRIMARY: 'primary',
  SUBSCRIBE: 'subscribe',
  SIGNIN: 'signin',
})

const CustomButton = ({ buttonType = ButtonTypes.PRIMARY, onClick, text, startIcon, endIcon }) => {
  const theme = useTheme()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  // ? Style
  const buttonStyle = {
    borderRadius: '3rem',
    padding: '0.5rem 0.75rem',
    // color: buttonType === ButtonTypes.SIGNIN ? 'theme.palette.secondary.main' : buttonType === ButtonTypes.SUBSCRIBE ? 'background.default' : 'primary.contrastText',
    color: buttonType === ButtonTypes.SIGNIN ? 'theme.palette.secondary.main' : buttonType === ButtonTypes.PRIMARY ? 'text.primary' : buttonType === ButtonTypes.SUBSCRIBE && theme.palette.mode === 'dark' ? 'background.default' : 'text.primary',
    backgroundColor: buttonType === ButtonTypes.PRIMARY ? 'rgba(255, 255, 255, 0.05)' : buttonType === ButtonTypes.SUBSCRIBE ? 'white' : '',
    border: buttonType === ButtonTypes.SIGNIN ? `1px solid ${theme.palette.grey[800]}` : '',
    p: buttonType === ButtonTypes.SIGNIN ? '0.25rem 0.5rem' : '',
    height: buttonType !== ButtonTypes.SIGNIN ? 40 : 32,
    width: buttonType === ButtonTypes.SIGNIN && isSM ? '6rem' : null,
    // ? Hover Style
    '&:hover': {
      backgroundColor: buttonType === ButtonTypes.SUBSCRIBE ? 'rgba(255, 255, 255, 0.8)' : buttonType === ButtonTypes.PRIMARY ? 'rgba(255, 255, 255, 0.1)' : '',
    },
  }
  return (
    <Button
      variant={buttonType === ButtonTypes.SIGNIN ? 'outlined' : 'contained'}
      sx={buttonStyle}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}>
      {text}
    </Button>
  )
}

export default CustomButton
