import { combineReducers } from 'redux'
import user, { IUserState } from './user/user'

export interface IGlobalState {
  user: IUserState,
}

export default combineReducers({
  user,
})