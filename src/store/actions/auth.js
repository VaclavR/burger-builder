import * as actionTypes from './actionsTypes'
import axios from 'axios'

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = authData => ({type: actionTypes.AUTH_SUCCESS, authData})
const authFail = error => ({type: actionTypes.AUTH_FAIL, error})

export const auth = (email, password) => dispatch => {
    dispatch(authStart())
    const authData = {email, password, returnSecureToken: true}
    axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDx2NMahuypDEs1QLihHis8t2V4z1kQZWM',
        authData,
    ).then(response => {
        dispatch(authSuccess(response))
    }).catch(error => {
        console.log(error)
        dispatch(authFail(error))
    })
}
