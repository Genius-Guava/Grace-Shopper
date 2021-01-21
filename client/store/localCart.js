import axios from 'axios'

const FETCH_LOCAL = 'FETCH_LOCAL'
const ADD_TO_LOCAL = 'ADD_TO_LOCAL'
const REMOVE_FROM_LOCAL = 'REMOVE_FROM_LOCAL'
const CHECKOUT_LOCAL = 'CHECKOUT_LOCAL'

export const fetchLocal = () => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  return {
    type: FETCH_LOCAL,
    cart
  }
}

export const removeFromLocal = plantId => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  const newPlants = cart.plants.filter(plant => plant.id !== plantId)
  cart.plants = newPlants
  console.log('cart plants after removal ', cart)
  localStorage.setItem('cart', JSON.stringify(cart))
  return {
    type: REMOVE_FROM_LOCAL,
    cart
  }
}

export const addToLocal = plant => {
  let inCart = false
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.status = 'In Cart'
  for (let i = 0; i < cart.plants.length; i++) {
    if (cart.plants[i].id === plant.id) {
      inCart = true
      cart.plants[i].lineItem.quantity = cart.plants[i].lineItem.quantity + 1
    }
  }
  if (!inCart) {
    plant.lineItem = {}
    plant.lineItem.quantity = 1
    cart.plants.push(plant)
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  return {
    type: ADD_TO_LOCAL,
    cart
  }
}

export const checkOutLocal = () => {
  localStorage.setItem(
    'cart',
    JSON.stringify({
      plants: [],
      status: 'Past'
    })
  )
  const cart = {
    plants: [],
    status: 'Past'
  }
  return {
    type: CHECKOUT_LOCAL,
    cart
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL:
      return action.cart
    case ADD_TO_LOCAL:
      return action.cart
    case REMOVE_FROM_LOCAL:
      return action.cart
    case CHECKOUT_LOCAL:
      return action.cart
    default:
      return state
  }
}
