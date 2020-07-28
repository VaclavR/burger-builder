import * as actionTypes from './actionsTypes'
import axios from 'axios'

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = authData => ({type: actionTypes.AUTH_SUCCESS, authData})
const authFail = error => ({type: actionTypes.AUTH_FAIL, error})

export const auth = (email, password, method) => dispatch => {
    dispatch(authStart())
    const authData = {email, password, returnSecureToken: true}
    const authKey = 'AIzaSyDx2NMahuypDEs1QLihHis8t2V4z1kQZWM'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${authKey}`
    axios.post(url, authData)
        .then(response => {
            console.log('je to v cajku', response)
            dispatch(authSuccess(response))
        }).catch(error => {
            console.dir(error)
            dispatch(authFail(error))
        })
}
