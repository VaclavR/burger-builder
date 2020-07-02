import React from 'react'
import PropTypes from 'prop-types'
import styles from './DrawerToggle.module.css'

const drawerToggle = props => (
    <div
        className={styles.DrawerToggle}
        onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

drawerToggle.propTypes = {
    clicked: PropTypes.func
}

export default drawerToggle
