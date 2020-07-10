import React, {Component} from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = []
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(() => {
                this.setState({loading: false})
            })
    }

    render() {
        let orders = <Spinner />
        if (this.state.orders.length) {
            orders = this.state.orders.map(order => {
                return (<Order
                    key={order.id}
                    ingredients={order.ingredient}
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

export default withErrorHandler(Orders, axios)
