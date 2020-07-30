import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../../Logo/Logo'
import styles from './SideDrawer.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = props => {

    return (
        <React.Fragment>
            <Backdrop isVisible={props.isOpen} clicked={props.closedHandler} />
            <div className={[styles.SideDrawer, (props.isOpen ? styles.Open : styles.Close)].join(' ')}>
                <div className={styles.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </React.Fragment>
    )
}

sideDrawer.propTypes = {
    isOpen: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    closedHandler: PropTypes.func
}

export default sideDrawer
