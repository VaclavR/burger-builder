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
                clicked={props.checkoutCancelled}
                btnType='Danger'>CANCEL</Button>
            <Button
                clicked={props.checkoutContinued}
                btnType='Success'>CONFIRM</Button>
        </div>
    )
}

checkoutSummary.propTypes = {
    ingredients: PropTypes.object,
    checkoutCancelled: PropTypes.func,
    checkoutContinued: PropTypes.func
}

export default checkoutSummary
