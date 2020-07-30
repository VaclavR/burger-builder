import React from 'react'
import PropTypes from 'prop-types'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/' isExact>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem link='/logout'>Logout</NavigationItem>
            : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
)

navigationItems.propTypes = {
    isAuthenticated: PropTypes.bool
}

export default navigationItems
