import axios from 'axios'

const UPDATE_PLANT = 'UPDATE_PLANT'
const FETCH_PLANT = 'FETCH_PLANT'

const fetchSinglePlant = plant => {
  return {
    type: FETCH_PLANT,
    plant
  }
}

const updatePlant = plant => {
  return {
    type: UPDATE_PLANT,
    plant
  }
}

export const getSinglePlant = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/plants/${id}`)
      dispatch(fetchSinglePlant(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const editPlant = (plantId, plant) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/plants/${plantId}`, plant)
      dispatch(updatePlant(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLANT:
      return action.plant
    case FETCH_PLANT:
      return {...state, ...action.plant}
    default:
      return state
  }
}
