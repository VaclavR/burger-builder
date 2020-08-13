import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

const BurgerBuilder = props => {
    const [isPurchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredients()
    }, [])

    const updatePurchaseState = () => {
        return Object.values(props.ingredients).some(value => value)
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }

    let orderSummary = null
    let burger = props.isError ? <p style={{ textAlign: 'center' }}>Ingredients can&apos;t be loaded!</p> : <Spinner />
    if (props.ingredients) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    ingredients={props.ingredients}
                    price={props.totalPrice}
                    isPurchaseable={updatePurchaseState()}
                    isAuthenticated={props.isAuthenticated}
                    ordered={purchaseHandler} />
            </React.Fragment>
        )
        orderSummary = (
            <OrderSummary
                totalPrice={props.totalPrice}
                ingredients={props.ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />)
    }
    return (
        <React.Fragment>
            <Modal
                isVisible={isPurchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isError: state.burgerBuilder.isError,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
}

BurgerBuilder.propTypes = {
    history: PropTypes.object,
    ingredients: PropTypes.object,
    onIngredientAdded: PropTypes.func,
    onIngredientRemoved: PropTypes.func,
    onInitIngredients: PropTypes.func,
    onInitPurchase: PropTypes.func,
    onSetAuthRedirectPath: PropTypes.func,
    totalPrice: PropTypes.number,
    isError: PropTypes.bool,
    isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
