import { legacy_createStore as createStore } from 'redux'
import baseReducer from './reducers/baseReducer'
import { combineReducers } from 'redux'
import dataReducer from './reducers/dataReducer'

const myStore = combineReducers({
  base: baseReducer,
  data: dataReducer,
})

const store = createStore(
  // baseReducer,
  myStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
