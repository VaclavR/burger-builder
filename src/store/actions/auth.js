import * as actionTypes from './actionsTypes'
import axios from 'axios'

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = (idToken, localId) => ({type: actionTypes.AUTH_SUCCESS, idToken, localId})
const authFail = error => ({type: actionTypes.AUTH_FAIL, error})
const logout = () => ({type: actionTypes.AUTH_LOGOUT})

export const checkAuthTimeout = expiresIn => dispatch => {
    setTimeout(() => {dispatch(logout())}, expiresIn * 1000)
}

export const auth = (email, password, method) => dispatch => {
    dispatch(authStart())
    const authData = {email, password, returnSecureToken: true}
    const authKey = 'AIzaSyDx2NMahuypDEs1QLihHis8t2V4z1kQZWM'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${authKey}`
    axios.post(url, authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error.response.data.error))
        })
}
