import React from 'react'
import { useSelector } from 'react-redux'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, Divider, Typography, alpha, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { Home, SubscriptionsOutlined, VideoLibraryOutlined, HistoryOutlined, WhatshotOutlined, ShoppingBagOutlined, MusicNoteOutlined, MovieOutlined, LiveTvOutlined, GamepadOutlined, NewspaperOutlined, SportsSoccerOutlined, LightbulbOutlined, DryCleaningOutlined, MicOutlined, ViewListOutlined, YouTube, SettingsOutlined, ReportOutlined, QuestionMarkOutlined, FeedbackOutlined, AccountCircleOutlined as AvatarIcon } from '@mui/icons-material'
import CustomButton, { ButtonTypes } from '../CustomButton'
import Constants from '../../services/constants'

/**
 * Renders the sidebar component.
 *
 * @return {JSX.Element} The sidebar component.
 */
const SideBar = () => {
  const isCollapsed = useSelector((state) => state.base.isSidebarCollapsed)
  const [selected, setSelected] = React.useState('Home')

  const MemoizedMenuItem = React.memo(MenuItem)

  const theme = useTheme()

  const sizeList = [useMediaQuery('(min-width:684px)'), useMediaQuery('(min-width:1080px)'), useMediaQuery('(min-width:1408px)'), useMediaQuery('(min-width:1734px)'), useMediaQuery('(min-width:1900px)'), useMediaQuery('(min-width:2060px)')]

  // List of links
  const links = [
    {
      title: 'Home',
      to: '/',
      icon: <Home />,
    },
    {
      title: 'Shorts',
      to: '/',
      icon: (
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium "
          fill={theme.palette.text.primary}
          focusable="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ pointerEvents: 'none', display: 'block' }}>
          <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
        </svg>
      ),
    },
    {
      title: 'Subscriptions',
      to: '/',
      icon: <SubscriptionsOutlined />,
    },
    { divider: true },
    {
      title: 'Library',
      to: '/',
      icon: <VideoLibraryOutlined />,
    },
    {
      title: 'History',
      to: '/',
      icon: <HistoryOutlined />,
    },

    { divider: true },

    {
      typography: true,
      title: 'Sign in to like videos, comment, and subscribe.\n',
      icon: (
        <>
          <br />
          <CustomButton
            buttonType={ButtonTypes.SIGNIN}
            text={'Sign In'}
            startIcon={<AvatarIcon />}
          />
        </>
      ),
    },

    { divider: true },
    {
      typography: true,
      title: 'Explore',
    },
    {
      title: 'Trending',
      to: '/trending',
      icon: <WhatshotOutlined />,
    },
    {
      title: 'Shopping',
      to: '/shopping',
      icon: <ShoppingBagOutlined />,
    },
    {
      title: 'Music',
      to: '/music',
      icon: <MusicNoteOutlined />,
    },
    {
      title: 'Movies',
      to: '/movies',
      icon: <MovieOutlined />,
    },
    {
      title: 'Live',
      to: '/live',
      icon: <LiveTvOutlined />,
    },
    {
      title: 'Gaming',
      to: '/gaming',
      icon: <GamepadOutlined />,
    },
    {
      title: 'News',
      to: '/news',
      icon: <NewspaperOutlined />,
    },
    {
      title: 'Sports',
      to: '/sports',
      icon: <SportsSoccerOutlined />,
    },
    {
      title: 'Learning',
      to: '/learning',
      icon: <LightbulbOutlined />,
    },
    {
      title: 'Fashion & Beauty',
      to: '/fashion-beauty',
      icon: <DryCleaningOutlined />,
    },
    {
      title: 'Podcasts',
      to: '/podcasts',
      icon: <MicOutlined />,
    },

    { divider: true },

    {
      title: 'Browse channels',
      to: '/browse',
      icon: <ViewListOutlined />,
    },

    { divider: true },
    { typography: true, title: 'More from YouTube' },
    {
      title: 'YouTube Premium',
      to: '/premium',
      icon: <YouTube />,
    },
    {
      title: 'YouTube Music',
      to: '/music',
      icon: <YouTube />,
    },
    {
      title: 'YouTube Kids',
      to: '/kids',
      icon: <YouTube />,
    },

    { divider: true },
    {
      title: 'Settings',
      to: '/account',
      icon: <SettingsOutlined />,
    },
    {
      title: 'Report history',
      to: '/report-history',
      icon: <ReportOutlined />,
    },
    {
      title: 'Help',
      to: '/help',
      icon: <QuestionMarkOutlined />,
    },
    {
      title: 'Send feedback',
      to: '/feedback',
      icon: <FeedbackOutlined />,
    },

    { divider: true },

    // { typography: true, footer: ['About', 'Press', 'Copyright', 'Contact us', 'Creators', 'Advertise', 'Developers', 'Terms', 'Privacy', 'Safety', 'How YouTube works', 'Test new features', '© 2023 bytebane'] },
    {
      typography: true,
      footer: [
        {
          title: 'About',
          to: Constants.ABOUT,
        },
        {
          title: 'Press',
          to: Constants.PRESS,
        },
        {
          title: 'Copyright',
          to: Constants.COPYRIGHT,
        },
        {
          title: 'Contact us',
          to: Constants.CONTACT_US,
        },
        {
          title: 'Creators',
          to: Constants.CREATORS,
        },
        {
          title: 'Advertise',
          to: Constants.ADVERTISE,
        },
        {
          title: 'Developers',
          to: Constants.DEVELOPERS,
        },
        {
          title: 'Terms',
          to: Constants.TERMS,
        },
        {
          title: 'Privacy',
          to: Constants.PRIVACY,
        },
        {
          title: 'Safety',
          to: Constants.SAFETY,
        },
        {
          title: 'How YouTube works',
          to: Constants.WORKS,
        },
        {
          title: 'Test new features',
          to: Constants.TEST_FEATURES,
        },
        {
          title: '© 2023 bytebane',
        },
      ],
    },
  ]
  return (
    <Box
      sx={{
        '& .ps-sidebar-root': {
          border: 'none',
        },
        '& .ps-sidebar-container': {
          backgroundColor: 'background.default',
        },
        '& .ps-menuitem-root': {},
        '& .ps-menu-button': {
          borderRadius: '5rem !important',
        },
        '& .ps-menu-button:hover': {
          backgroundColor: `${alpha(theme.palette.text.primary, 0.3)}!important`,
        },
        '& .ps-menu-button.ps-active': {
          backgroundColor: alpha(theme.palette.text.primary, 0.2),
          color: `${theme.palette.text.primary} !important`,
          transform: 'scale(1.01)',
        },
        '& .ps-sidebar-root.ps-collapsed .ps-menu-label': {
          fontSize: theme.typography.caption.fontSize,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        '& .ps-sidebar-root.ps-collapsed .ps-menu-button:hover': {
          backgroundColor: 'transparent!important',
          scale: '1.4',
        },
        '& .ps-sidebar-root.ps-collapsed .ps-menu-button.ps-active': {
          backgroundColor: 'transparent',
          scale: '1.2',
          color: `${theme.palette.text.primary} !important`,
        },
        '& .ps-menu-button.ps-active:hover': {
          backgroundColor: '#676767 !important',
        },
      }}>
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={sizeList[0] && sizeList[1] ? { height: 'calc(100vh - 64px)' } : sizeList[0] && isCollapsed ? { display: 'none' } : isCollapsed ? { display: 'none' } : { height: 'calc(100vh - 64px)', position: 'fixed', zIndex: 1000 }}>
        <Menu>
          {!isCollapsed ? (
            links.map((link, index) =>
              // Check for dividers / links / headings
              link.divider ? (
                <Divider
                  key={index}
                  variant="middle"
                  sx={{ my: 1 }}
                />
              ) : link.typography ? (
                link.footer ? (
                  <div style={{ margin: '0 1rem' }}>
                    {link.footer.map((footer, index) => {
                      if (index === link.footer.length - 1) {
                        return (
                          <Typography
                            key={index}
                            style={{ textDecoration: 'none', color: theme.palette.text.primary, fontSize: theme.typography.subtitle1.fontSize }}>
                            <br />
                            <br />
                            {footer.title}
                          </Typography>
                        )
                      } else {
                        return (
                          <Link
                            key={index}
                            to={footer.to}
                            target="_blank"
                            style={{ textDecoration: 'none', color: theme.palette.text.primary, fontSize: theme.typography.subtitle2.fontSize }}>
                            {footer.title}{' '}
                          </Link>
                        )
                      }
                    })}
                  </div>
                ) : (
                  <Typography
                    key={index}
                    variant={link.icon ? 'body2' : 'h6'}
                    sx={{ color: theme.palette.text.primary, ml: 2 }}>
                    {link.title}
                    {link.icon}
                  </Typography>
                )
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  style={{ textDecoration: 'none' }}>
                  <MemoizedMenuItem
                    component={'div'}
                    active={selected === link.title}
                    style={{
                      color: theme.palette.text.primary,
                    }}
                    onClick={() => setSelected(link.title)}
                    icon={link.icon}>
                    {link.title}
                  </MemoizedMenuItem>
                </Link>
              )
            )
          ) : (
            <>
              {links
                .filter((_, index) => index < 6 && index !== 3)
                .map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    style={{ color: theme.palette.text.primary, textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <MemoizedMenuItem
                      component={'div'}
                      active={selected === link.title}
                      style={{}}
                      onClick={() => setSelected(link.title)}
                      icon={link.icon}></MemoizedMenuItem>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.primary }}>
                      {link.title}
                    </Typography>
                  </Link>
                ))}
            </>
          )}
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default SideBar
