import * as actionTypes from './actionsTypes'
import axios from 'axios'

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = (idToken, localId) => ({type: actionTypes.AUTH_SUCCESS, idToken, localId})
const authFail = error => ({type: actionTypes.AUTH_FAIL, error})

export const logout = () => {
    localStorage.removeItem('idToken')
    localStorage.removeItem('localId')
    localStorage.removeItem('expirationDate')
    return {type: actionTypes.AUTH_LOGOUT}
}

const checkAuthTimeout = expiresIn => dispatch => {
    setTimeout(() => {dispatch(logout())}, expiresIn * 1000)
}

export const auth = (email, password, method) => dispatch => {
    dispatch(authStart())
    const authData = {email, password, returnSecureToken: true}
    const authKey = 'AIzaSyDx2NMahuypDEs1QLihHis8t2V4z1kQZWM'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${authKey}`
    axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('idToken', response.data.idToken)
            localStorage.setItem('localId', response.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            dispatch(authFail(error.response.data.error))
        })
}

export const setAuthRedirectPath = path => ({type: actionTypes.SET_AUTH_REDIRECT_PATH, path})

export const authCheckState = () => dispatch => {
    const idToken = localStorage.getItem('idToken')
    const localId = localStorage.getItem('localId')
    if (!idToken) {
        dispatch(logout())
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(idToken, localId))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
