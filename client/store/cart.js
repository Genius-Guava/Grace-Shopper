import axios from 'axios'

const FETCH_CART = 'FETCH_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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
    default:
      return state
  }
}
