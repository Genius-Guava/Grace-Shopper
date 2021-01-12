import axios from 'axios'

const UPDATE_PLANT = 'UPDATE_PLANT'

export const updatePlant = plant => {
  return {
    type: UPDATE_PLANT,
    plant
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
    default:
      return state
  }
}
