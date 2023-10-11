import { TOGGLE_THEME, TOGGLE_LOADER, TOGGLE_SIDEBAR } from '../actions/actionTypes'

const baseStore = {
  isDark: true,
  isLoading: false,
  isSidebarCollapsed: true,
}

const baseReducer = (state = baseStore, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDark: !state.isDark,
      }
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      }
    default:
      return state
  }
}

export default baseReducer
