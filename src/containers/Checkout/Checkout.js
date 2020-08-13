import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../components/Order/CheckoutSummary/ContactData/ContactData'

const Checkout = props => {
    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to='/' />
    if (props.ingredients) {
        const purchasedRedirect = props.isPurchased ? <Redirect to='/' /> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
    return summary
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
