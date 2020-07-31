import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    updatePurchaseState() {
        return Object.values(this.props.ingredients).some(value => value)
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    render() {
        let orderSummary = null
        let burger = this.props.isError ? <p style={{textAlign: 'center'}}>Ingredients can&apos;t be loaded!</p> : <Spinner />
        if (this.props.ingredients) {
            burger =  (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ingredients={this.props.ingredients}
                        price={this.props.totalPrice}
                        isPurchaseable={this.updatePurchaseState()}
                        isAuthenticated={this.props.isAuthenticated}
                        ordered={this.purchaseHandler} />
                </React.Fragment>
            )
            orderSummary = (
                <OrderSummary
                    totalPrice={this.props.totalPrice}
                    ingredients={this.props.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />)
        }
        return (
            <React.Fragment>
                <Modal
                    isVisible={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
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
