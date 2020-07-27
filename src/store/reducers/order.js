import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'

const initialState = {
    orders: [],
    isLoading: false,
    isPurchased: false
}

const purchaseOrderSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        isPurchased: true,
        orders: state.orders.concat({...action.data, id: action.id})
    })
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        isLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return updateObject(state, {isPurchased: false})
        case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {isLoading: true})
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseOrderSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {isLoading: false})
        case actionTypes.FETCH_ORDERS_START: return updateObject(state, {isLoading: true})
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {isLoading: false})
        default: return state
    }
}

export default reducer
