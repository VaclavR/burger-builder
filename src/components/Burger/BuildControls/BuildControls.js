import React from 'react'
import PropTypes from 'prop-types'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
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
                disabled={!props.ingredients[ctrl.type]} />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>Order Now</button>
    </div>
)


buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    ingredients: PropTypes.object,
    price: PropTypes.number,
    purchaseable: PropTypes.bool,
    ordered: PropTypes.func
}

export default buildControls
