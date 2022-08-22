import { Placeholder } from 'react-bootstrap';
import {combineReducers} from 'redux'
import { request } from './PlaceOrderreducer';
import { FETCH} from './reducer'
export const rootReducer= combineReducers({
  product:FETCH,
  order:request
});