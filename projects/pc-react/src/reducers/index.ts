import { combineReducers } from 'redux'
import { default as appReducer } from './appReducer'

export default combineReducers({
  app: appReducer,
})
