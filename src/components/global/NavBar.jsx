import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Link, Container, Tooltip, useMediaQuery } from '@mui/material'
import { Menu as MenuIcon, MoreVert as MoreIcon, Search as SearchIcon, Mic as MicIcon } from '@mui/icons-material'
import AvatarIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../../services/redux/actions/baseAction'
import CustomButton, { ButtonTypes } from '../CustomButton'

import YTLogoDark from '../../assets/yt_logo_rgb_dark.png'
import YTLogoLight from '../../assets/yt_logo_rgb_light.png'
import SettingsMenu from '../SettingsMenu'

import SearchBar, { StyledIconButton } from '../SearchBar'

// TODO: Add Search Functionality (Get Search Results and store in VideoData)

const NavBar = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

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

  return (
    <Box
      sx={{ flexGrow: 1 }}
      component={'nav'}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'background.default', backgroundImage: 'none', boxShadow: 'none', px: 1, minHeight: '64px' }}>
        <Toolbar sx={{ margin: '0!important', padding: '0!important', display: 'flex', alignItems: 'center' }}>
          {isMd && expandSearchBar ? (
            <SearchBar
              width="100%"
              margin="0 1rem"
              expandSearchBar={expandSearchBar}
              setExpandSearchBar={setExpandSearchBar}
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
                <SearchBar
                  expandSearchBar={expandSearchBar}
                  setExpandSearchBar={setExpandSearchBar}
                />
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
                  sx={{ mr: isSm ? 0 : 1 }}>
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
                {!isSm && (
                  <CustomButton
                    buttonType={ButtonTypes.SIGNIN}
                    text={'Sign In'}
                    startIcon={<AvatarIcon />}
                  />
                )}
              </Container>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
