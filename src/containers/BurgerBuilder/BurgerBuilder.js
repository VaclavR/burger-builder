import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(() => this.setState({error: true}))
    }

    updatePurchaseState() {
        this.setState({purchaseable: Object.values(this.state.ingredients).some(value => value)})
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}, this.updatePurchaseState)
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        if (!oldCount) return
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}, this.updatePurchaseState)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true})
        // const orderData = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Max Schwarzmuller',
        //         addres: {
        //             street: 'Teststreet 1',
        //             city: 'Berlin',
        //             zipCode: '41351',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('orders.json', orderData)
        //     .then(() => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false})
        //         console.warn(error)
        //     })
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        this.props.history.push({
            pathname: '/checkout',
            search: queryParams.join('&')
        })
    }

    render() {
        let orderSummary = null
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can&apos;t be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger =  (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        isPurchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </React.Fragment>
            )
            orderSummary = (
                <OrderSummary
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />)
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
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

BurgerBuilder.propTypes = {
    history: PropTypes.object
}

export default withErrorHandler(BurgerBuilder, axios)
