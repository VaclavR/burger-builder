import React, { Component } from 'react'
import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import PropTypes from 'prop-types'

class Burger extends Component {
    render () {
        let transformedIngredients = Object.keys(this.props.ingredients)
            .flatMap(igKey => {
                return [...Array(this.props.ingredients[igKey])]
                    .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />)
            })

        if (!transformedIngredients.length) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

        return (
            <div className={styles.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        )
    }
}

Burger.propTypes = {
    ingredients: PropTypes.object
}

export default Burger
