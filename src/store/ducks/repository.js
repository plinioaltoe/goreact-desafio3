/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'repository/ADD_REQUEST',
  ADD_SUCESS: 'repository/ADD_SUCESS',
  ADD_FAILURE: 'repository/ADD_FAILURE',
}

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
}

export default function repository(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true }
    case Types.ADD_SUCESS:
      return { ...state, loading: false, error: null, data: [...state.data, action.payload.data] }
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error }

    default:
      return state
  }
}

/**
 * Actions
 */
export const Creators = {
  addRepositoryRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository },
  }),

  addRepositorySuccess: data => ({
    type: Types.ADD_SUCESS,
    payload: { data },
  }),

  addRepositoryFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
}
