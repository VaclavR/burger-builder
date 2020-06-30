import React from 'react'
import PropTypes from 'prop-types'

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
        </React.Fragment>
    )
}

orderSummary.propTypes = {
    ingredients: PropTypes.object
}

export default orderSummary
