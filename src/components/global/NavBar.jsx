import React from 'react'
import { styled } from '@mui/material/styles'
import { AppBar, Box, Toolbar, IconButton, Link, Container, alpha, InputBase, Tooltip, useMediaQuery } from '@mui/material'
import { Menu as MenuIcon, Search as SearchIcon, MoreVert as MoreIcon, Mic as MicIcon, ArrowBack } from '@mui/icons-material'
import AvatarIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../../services/redux/actions/baseAction'
import CustomButton, { ButtonTypes } from '../CustomButton'

import YTLogoDark from '../../assets/yt_logo_rgb_dark.png'
import YTLogoLight from '../../assets/yt_logo_rgb_light.png'
import SettingsMenu from '../SettingsMenu'

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  minWidth: '270px',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3, 0, 3),
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundColor: theme.palette.grey[800],
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  display: 'flex',
  color: 'text.primary',
  width: '100%',
  '& .MuiInputBase-input': {
    '&:focus': {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    padding: theme.spacing(1, 0, 1, 2),
    // vertical padding + font size from searchIcon
    marginRight: `calc(1.5em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    border: `1px solid ${theme.palette.grey[800]}`,
    width: '100%',
  },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.grey[800],

  color: 'white',
  borderRadius: 50,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[800], 0.8),
  },
}))

// TODO: Add Search Functionality (Get Search Results and store in VideoData)

const NavBar = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const isMd = useMediaQuery(theme.breakpoints.down('md'))

  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // Menu

  // SearchBar
  const [expandSearchBar, setExpandSearchBar] = React.useState(false)
  const SearchBar = ({ width, margin }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: width, margin: margin }}>
        {expandSearchBar && (
          <StyledIconButton
            sx={{ mr: 1 }}
            onClick={() => setExpandSearchBar(false)}>
            <ArrowBack />
          </StyledIconButton>
        )}
        <Search>
          <StyledInputBase
            inputComponent={'input'}
            type="search"
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <Tooltip title="Search">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Tooltip>
        </Search>
        <Tooltip title="Search with your voice">
          <StyledIconButton
            size="medium"
            aria-label="search with your voice"
            edge="end">
            <MicIcon />
          </StyledIconButton>
        </Tooltip>
      </div>
    )
  }

  return (
    <Box
      sx={{ flexGrow: 1 }}
      component={'nav'}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'background.default', backgroundImage: 'none', boxShadow: 'none', px: 1 }}>
        <Toolbar sx={{ margin: '0!important', padding: '0!important', display: 'flex', alignItems: 'center' }}>
          {isMd && expandSearchBar ? (
            <SearchBar
              width="100vw"
              margin="0 1rem"
            />
          ) : (
            <>
              <Container
                className="nav-left"
                sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="text.primary"
                  aria-label="open drawer"
                  onClick={() => dispatch(toggleSidebar())}>
                  <MenuIcon />
                </IconButton>
                <Link
                  href="/"
                  underline="none">
                  <Tooltip title="Youtube Home">
                    <img
                      style={{
                        height: '24px',
                        alignSelf: 'center',
                      }}
                      src={theme.palette.mode === 'light' ? YTLogoLight : YTLogoDark}
                      alt="Youtube Logo"
                      aria-label="Home"
                    />
                  </Tooltip>
                </Link>
              </Container>
              {!isMd && (
                <Container
                  className="nav-mid"
                  sx={{ display: 'flex', alignItems: 'center' }}>
                  <SearchBar />
                </Container>
              )}
              <Container
                className="nav-right"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {isMd && (
                  <>
                    <Tooltip title="Search">
                      <StyledIconButton
                        sx={{ mr: 1 }}
                        onClick={() => setExpandSearchBar(true)}>
                        <SearchIcon />
                      </StyledIconButton>
                    </Tooltip>
                    <Tooltip title="Search with your voice">
                      <StyledIconButton
                        size="medium"
                        aria-label="search with your voice"
                        edge="end"
                        sx={{ mr: 1 }}>
                        <MicIcon />
                      </StyledIconButton>
                    </Tooltip>
                  </>
                )}
                <Tooltip
                  title="Settings"
                  sx={{ mr: 1 }}>
                  <IconButton
                    color="text.primary"
                    size="medium"
                    edge="end"
                    aria-label="Settings-menu"
                    onClick={handleClick}>
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
                <SettingsMenu
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  handleClose={handleClose}
                />
                <CustomButton
                  buttonType={ButtonTypes.SIGNIN}
                  text={'Sign In'}
                  startIcon={<AvatarIcon />}
                />
              </Container>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
