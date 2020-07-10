import React from 'react'
import PropTypes from 'prop-types'
import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={styles.BurgerContainer}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                clicked
                btnType='Danger'>CANCEL</Button>
            <Button
                clicked
                btnType='Success'>CONFIRM</Button>
        </div>
    )
}

checkoutSummary.propTypes = {
    ingredients: PropTypes.array
}

export default checkoutSummary
