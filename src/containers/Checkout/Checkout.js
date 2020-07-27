import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.isPurchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        isPurchased: state.order.isPurchased
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    ingredients: PropTypes.object,
    totalPrice: PropTypes.number,
    onPurchaseInit: PropTypes.func,
    isPurchased: PropTypes.bool
}

export default connect(mapStateToProps)(Checkout)
