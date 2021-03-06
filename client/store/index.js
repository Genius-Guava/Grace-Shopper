import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import plants from './plants'
import singlePlant from './singlePlant'
import cart from './cart'
import users from './users'
import form from './form'
import localCart from './localCart'

const reducer = combineReducers({
  user,
  plants,
  singlePlant,
  cart,
  users,
  form,
  localCart
})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store
export * from './user'
