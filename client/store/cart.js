import axios from 'axios'

const FETCH_CART = 'FETCH_CART'

export const fetchedCart = cart => {
  return {
    type: FETCH_CART,
    cart
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(fetchedCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.cart
    default:
      return state
  }
}
