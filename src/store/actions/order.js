import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

const purchaseBurgerSucces = (id, data) => ({type: actionTypes.PURCHASE_BURGER_SUCCESS, id, data})
const purchaseBurgerFail = error => ({type: actionTypes.PURCHASE_BURGER_FAIL, error})
const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START})
export const purchaseBurger = orderData => dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSucces(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
}

export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT})

const fetchOrdersSucces = orders => ({type: actionTypes.FETCH_ORDERS_SUCCESS, orders})
const fetchOrdersFail = error => ({type: actionTypes.FETCH_ORDERS_FAIL, error})
const fetchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START})
export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = []
            for (const key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSucces(fetchedOrders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
}

