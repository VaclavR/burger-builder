import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'

const initialState = {
    idToken: null,
    localId: null,
    error: null,
    loading: false
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        localId: action.localId,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        idToken: null,
        localId: null,
        error: action.error,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, {error: null, isLoading: true})
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        default: return state
    }
}

export default reducer
