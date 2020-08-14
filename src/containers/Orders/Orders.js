import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions/'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order'

const Orders = props => {
    const {onFetchOrders, idToken, localId} = props

    useEffect(() => {
        onFetchOrders(idToken, localId)
    }, [onFetchOrders, idToken, localId])


    let orders = props.orders.map(order => {
        return (<Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />)
    })

    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        idToken: state.auth.idToken,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (idToken, localId) => dispatch(actions.fetchOrders(idToken, localId))
    }
}

Orders.propTypes = {
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    onFetchOrders: PropTypes.func,
    idToken: PropTypes.string,
    localId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
