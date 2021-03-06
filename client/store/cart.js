import axios from 'axios'

const FETCH_CART = 'FETCH_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const ADD_TO_CART = 'ADD_TO_CART'

const fetchedCart = cart => {
  return {
    type: FETCH_CART,
    cart
  }
}

const removedFromCart = plantId => {
  return {
    type: REMOVE_FROM_CART,
    plantId
  }
}

const checkedOutCart = () => {
  return {
    type: CHECKOUT_CART
  }
}

const updateCart = cart => {
  return {
    type: ADD_TO_CART,
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

export const removeFromCart = plantId => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', {data: {plantId: plantId}})
      dispatch(removedFromCart(plantId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const checkoutCart = cartId => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/checkout', {cartId: cartId})
      dispatch(checkedOutCart())
    } catch (err) {
      console.error(err)
    }
  }
}

export const editCart = plantId => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart', {id: plantId})
      dispatch(updateCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}
const CLEAR_CART = 'CLEAR_CART'
const clear = () => {
  return {
    type: CLEAR_CART
  }
}
export const clearCart = () => {
  return dispatch => {
    dispatch(clear())
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return action.cart
    case REMOVE_FROM_CART:
      const newPlants = state.plants.filter(
        plant => plant.id !== action.plantId
      )
      return {...state, plants: newPlants}
    case CHECKOUT_CART:
      return {...state, status: 'Past'}
    case ADD_TO_CART:
      return action.cart
    case CLEAR_CART:
      return initialState
    default:
      return state
  }
}
