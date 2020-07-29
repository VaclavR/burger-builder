import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../store/actions/'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.idToken)
    }

    render() {
        let orders = <Spinner />
        if (this.props.orders.length) {
            orders = this.props.orders.map(order => {
                return (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />)
            })
        }
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
        idToken: state.auth.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: idToken => dispatch(actions.fetchOrders(idToken))
    }
}

Orders.propTypes = {
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    onFetchOrders: PropTypes.func,
    idToken: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
