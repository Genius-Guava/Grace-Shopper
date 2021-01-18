import {act} from 'react-test-renderer'

const FORM_SUCCESS = 'FORM_SUCCESS'
const FORM_ERRORS = 'FORM_ERRORS'
const FORM_RESET = 'FORM_RESET'

const defaultForm = {
  success: null,
  errors: {}
}

export const formSuccess = () => ({type: FORM_SUCCESS})
export const formReset = () => ({type: FORM_RESET})
export const formErrors = errors => {
  if (typeof errors === 'string' || errors instanceof String) {
    errors = {
      other: errors
    }
  }

  return {
    type: FORM_ERRORS,
    errors
  }
}

export default function(state = defaultForm, action) {
  switch (action.type) {
    case FORM_SUCCESS:
      return {
        success: true,
        errors: {}
      }
    case FORM_RESET:
      return defaultForm
    case FORM_ERRORS:
      return {
        success: false,
        errors: action.errors
      }
    default:
      return state
  }
}
