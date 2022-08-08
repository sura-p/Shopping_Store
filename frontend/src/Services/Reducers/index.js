import {combineReducers} from 'redux'
import { FETCH} from './reducer'
export const rootReducer= combineReducers({
  product:FETCH
});