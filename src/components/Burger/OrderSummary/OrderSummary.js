import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicisous burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    )
}

orderSummary.propTypes = {
    ingredients: PropTypes.object,
    purchaseCancelled: PropTypes.func,
    purchaseContinued: PropTypes.func
}

export default orderSummary
