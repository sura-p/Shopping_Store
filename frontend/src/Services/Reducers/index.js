import { Placeholder } from 'react-bootstrap';
import {combineReducers} from 'redux'
import { request } from './PlaceOrderreducer';
import { OrderFetch } from './OrderReducer';
import { FETCH} from './reducer'
import { payreq } from './PaymentReducers';
import { ohistory } from './orderhistoryReducer';
export const rootReducer= combineReducers({
  product:FETCH,
  order:request,
  orderlist:OrderFetch,
  payment:payreq,
  orderHistory:ohistory
});