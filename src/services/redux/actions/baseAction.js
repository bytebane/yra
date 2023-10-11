import { TOGGLE_LOADER, TOGGLE_SIDEBAR, TOGGLE_THEME } from './actionTypes'

export const toggleTheme = () => {
  return {
    type: TOGGLE_THEME,
  }
}

export const toggleLoader = () => {
  return {
    type: TOGGLE_LOADER,
  }
}

export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  }
}
