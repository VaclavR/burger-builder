import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
    idToken: null,
    localId: null,
    error: null,
    isLoading: false,
    authRedirectPath: '/'
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        localId: action.localId,
        error: null,
        isLoading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        idToken: null,
        localId: null,
        error: action.error,
        isLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, {error: null, isLoading: true})
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return updateObject(state, {idToken: null, localId: null})
        case actionTypes.SET_AUTH_REDIRECT_PATH: return updateObject(state, {authRedirectPath: action.path})
        default: return state
    }
}

export default reducer
