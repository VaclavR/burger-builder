import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actionTypes from '../../Store/actions'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get('/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data})
    //         })
    //         .catch(() => this.setState({error: true}))
    // }

    updatePurchaseState() {
        return Object.values(this.props.ingredients).some(value => value)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        let orderSummary = null
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can&apos;t be loaded!</p> : <Spinner />
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredient}),
        onIngredientRemoved: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient})
    }
}

BurgerBuilder.propTypes = {
    history: PropTypes.object,
    ingredients: PropTypes.object,
    onIngredientAdded: PropTypes.func,
    onIngredientRemoved: PropTypes.func,
    totalPrice: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
