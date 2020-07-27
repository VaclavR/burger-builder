import * as actionTypes from './actionsTypes'

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = authData => ({type: actionTypes.AUTH_SUCCESS, authData})
const authFail = error => ({type: actionTypes.AUTH_FAIL, error})
export const auth = (email, password) => dispatch => {
    dispatch(authStart())
}
