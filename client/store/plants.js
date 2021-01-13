import axios from 'axios'

const FETCH_PLANT = 'FETCH_PLANT'
const ADD_PLANT = 'ADD_PLANT'
const REMOVE_PLANT = 'REMOVE_PLANT'

const fetchedPlants = plants => {
  return {
    type: FETCH_PLANT,
    plants
  }
}
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

export const fetchPlants = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/plants')
      dispatch(fetchedPlants(data))
    } catch (err) {
      console.error(err)
    }
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
    case FETCH_PLANT:
      return action.plants
    case ADD_PLANT:
      return [...state, action.plant]
    case REMOVE_PLANT:
      return state.filter(plant => plant.id !== action.plantId)
    default:
      return state
  }
}
