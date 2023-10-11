import { Box, ThemeProvider, createTheme } from '@mui/material'
import NavBar from './components/global/NavBar'
import Sidebar from './components/global/SideBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Watch from 'pages/Watch'
import './themes/App.css'

import { darkTheme, lightTheme } from './themes/Themes'
import { useSelector } from 'react-redux'

const themedark = createTheme(darkTheme)
const themelight = createTheme(lightTheme)

function App() {
  const isDark = useSelector((state) => state.base.isDark)

  return (
    <ThemeProvider theme={isDark ? themedark : themelight}>
      <NavBar />
      <Box
        component={'main'}
        sx={{ display: 'flex', bgcolor: 'background.default', px: 1 }}>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/watch/:videoId"
            element={<Watch />}
          />
        </Routes>
      </Box>
    </ThemeProvider>
  )
}

export default App
