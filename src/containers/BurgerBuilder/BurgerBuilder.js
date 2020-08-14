import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
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

    const dispatch = useDispatch()

    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const isError = useSelector(state => state.burgerBuilder.isError)
    const isAuthenticated = useSelector(state => state.auth.idToken !== null)

    const onIngredientAdded = (ingredient) => dispatch(actions.addIngredient(ingredient))
    const onIngredientRemoved = (ingredient) => dispatch(actions.removeIngredient(ingredient))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = () => {
        return Object.values(ingredients).some(value => value)
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

    let orderSummary = null
    let burger = isError ? <p style={{ textAlign: 'center' }}>Ingredients can&apos;t be loaded!</p> : <Spinner />
    if (ingredients) {
        burger = (
            <React.Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    ingredients={ingredients}
                    price={totalPrice}
                    isPurchaseable={updatePurchaseState()}
                    isAuthenticated={isAuthenticated}
                    ordered={purchaseHandler} />
            </React.Fragment>
        )
        orderSummary = (
            <OrderSummary
                totalPrice={totalPrice}
                ingredients={ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler} />
        )
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

BurgerBuilder.propTypes = {
    history: PropTypes.object,
}

export default withErrorHandler(BurgerBuilder, axios)
