import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions/'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken, this.props.localId)
    }

    render() {
        let orders = this.props.orders.map(order => {
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
