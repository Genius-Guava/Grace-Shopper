import axios from 'axios'

const ADD_PLANT = 'ADD_PLANT'
const REMOVE_PLANT = 'REMOVE_PLANT'

const addPlant = plant => {
  return {
    type: ADD_PLANT,
    plant
  }
}

const removePlant = plantId => {
  return {
    type: REMOVE_PLANT,
    plantId
  }
}

export const addNewPlant = plant => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/plants', plant)
      dispatch(addPlant(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deletePlant = plantId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/plants/${plantId}`)
      dispatch(removePlant(plantId))
    } catch (err) {
      console.error(err)
    }
  }
}
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLANT:
      return [...state, action.plant]
    case REMOVE_PLANT:
      return state.filter(plant => plant.id !== action.plantId)
    default:
      return state
  }
}
