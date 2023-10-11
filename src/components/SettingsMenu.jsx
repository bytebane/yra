import { DarkMode, LightMode } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../services/redux/actions/baseAction'
import { ListItemIcon, ListItemText, MenuItem, Menu } from '@mui/material'
import React from 'react'

const SettingsMenu = ({ handleClose, anchorEl, setAnchorEl }) => {
  const open = Boolean(anchorEl)

  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.base.isDark)
  return (
    <Menu
      id="settings-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'settings-menu',
      }}>
      <MenuItem onClick={() => dispatch(toggleTheme())}>
        <ListItemIcon>{isDark ? <LightMode /> : <DarkMode />}</ListItemIcon>
        <ListItemText> {isDark ? 'Light Mode' : 'Dark Mode'}</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default SettingsMenu
