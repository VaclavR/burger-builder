import { put, delay, call } from 'redux-saga/effects'
import * as actions from '../actions/'
import axios from 'axios'

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'idToken')
    yield call([localStorage, 'removeItem'], 'localId')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    // yield localStorage.removeItem('idToken')
    // yield localStorage.removeItem('localId')
    // yield localStorage.removeItem('expirationDate')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    const authKey = 'AIzaSyDx2NMahuypDEs1QLihHis8t2V4z1kQZWM'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${action.method}?key=${authKey}`

    try {
        const response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('idToken', response.data.idToken)
        yield localStorage.setItem('localId', response.data.localId)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga() {
    const idToken = yield localStorage.getItem('idToken')
    if (!idToken) {
        yield put(actions.logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const localId = yield localStorage.getItem('localId')
            yield put(actions.authSuccess(idToken, localId))
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}
