import * as actionTypes from './actionsTypes'

export const purchaseBurgerSucces = (id, data) => ({type: actionTypes.PURCHASE_BURGER_SUCCESS, id, data})
export const purchaseBurgerFail = error => ({type: actionTypes.PURCHASE_BURGER_FAIL, error})
export const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START})
export const purchaseBurger = (orderData, idToken) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData, idToken
    }
}

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT})

export const fetchOrdersSucces = orders => ({type: actionTypes.FETCH_ORDERS_SUCCESS, orders})
export const fetchOrdersFail = error => ({type: actionTypes.FETCH_ORDERS_FAIL, error})
export const fetchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START})
export const fetchOrders = (idToken, localId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        idToken, localId
    }
}
