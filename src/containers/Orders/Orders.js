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
        this.props.onFetchOrders()
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
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

Orders.propTypes = {
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    onFetchOrders: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
