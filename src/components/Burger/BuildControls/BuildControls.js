import React from 'react'
import PropTypes from 'prop-types'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = props => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                isDisabled={!props.ingredients[ctrl.type]} />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.isPurchaseable}
            onClick={props.ordered}>{props.isAuthenticated ? 'Order Now' : 'Sign Up to Order'}</button>
    </div>
)


buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    ordered: PropTypes.func,
    ingredients: PropTypes.object,
    price: PropTypes.number,
    isPurchaseable: PropTypes.bool,
    isAuthenticated: PropTypes.bool
}

export default buildControls
