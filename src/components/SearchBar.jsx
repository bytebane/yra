import { ArrowBack, Search as SearchIcon, Mic as MicIcon } from '@mui/icons-material'
import { IconButton, InputBase, Tooltip, useMediaQuery } from '@mui/material'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { storeVideosData } from '../services/redux/actions/dataAction'
import { toggleLoader } from '../services/redux/actions/baseAction'
import getSearchResponse from '../services/api/getSearchResponse'

export const Search = styled('div')(({ theme }) => ({
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
  // minWidth: '220px',
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
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

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
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

const SearchBar = ({ width, margin, expandSearchBar, setExpandSearchBar }) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    if (inputValue.length > 0) {
      dispatch(toggleLoader())
      getSearchResponse(inputValue.trim())
        .then((res) => {
          dispatch(storeVideosData(res.data))
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch(toggleLoader())
        })
    }
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: width ?? '100%', margin: margin ?? '0 1rem' }}>
      {isMd && expandSearchBar && (
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
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <Tooltip title="Search">
          <SearchIconWrapper onClick={handleSearch}>
            <SearchIcon />
          </SearchIconWrapper>
        </Tooltip>
      </Search>
      <Tooltip title="Search with your voice">
        <StyledIconButton
          size="medium"
          sx={{ mr: '2px' }}
          aria-label="search with your voice"
          edge="end">
          <MicIcon />
        </StyledIconButton>
      </Tooltip>
    </div>
  )
}

export default SearchBar
