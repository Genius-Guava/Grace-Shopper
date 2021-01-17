import axios from 'axios'

const FETCH_USERS = 'FETCH_USERS'

const fetchedUsers = users => {
  return {
    type: FETCH_USERS,
    users
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(fetchedUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initalState = []

export default (state = initalState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
