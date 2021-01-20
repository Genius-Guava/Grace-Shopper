import axios from 'axios'
import history from '../history'
import {formErrors, formSuccess} from './form'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const saveProfile = updates => async dispatch => {
  let result
  try {
    result = await axios.put('/api/users/me', updates)
  } catch (authError) {
    return dispatch(formErrors(authError.response.data))
  }

  dispatch(getUser(result.data))
  dispatch(formSuccess())
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
  } catch (authError) {
    return dispatch(formErrors(authError.response.data))
  }

  try {
    dispatch(getUser(res.data))
    dispatch(formSuccess())
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signUp = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(formErrors(authError.response.data))
  }

  try {
    dispatch(getUser(res.data))
    dispatch(formSuccess())
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser

    default:
      return state
  }
}
