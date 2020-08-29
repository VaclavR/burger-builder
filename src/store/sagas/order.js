
import { put } from 'redux-saga/effects'
import * as actions from '../actions/'
import axios from '../../axios-orders'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try {
        const response = yield axios.post(`orders.json?auth=${action.idToken}`, action.orderData)
        yield put(actions.purchaseBurgerSucces(response.data.name, action.orderData))
    }
    catch(error) {
        yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart())
    const queryParams = `?auth=${action.idToken}&orderBy="localId"&equalTo="${action.localId}"`
    try {
        const response = yield axios.get(`/orders.json${queryParams}`)
        const fetchedOrders = []
        for (const key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }
        yield put(actions.fetchOrdersSucces(fetchedOrders))
    } catch (error) {
        yield put(action.fetchOrdersFail(error))
    }
}
