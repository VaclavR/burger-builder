import React from 'react'
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
import PropTypes from 'prop-types'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={!props.ingredients[ctrl.type]}/>
            ))}
        </div>
    )
}

buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    ingredients: PropTypes.object
}

export default buildControls
