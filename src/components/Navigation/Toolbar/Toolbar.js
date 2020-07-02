import React from 'react'
import PropTypes from 'prop-types'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


const toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={styles.Logo}><Logo /></div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func
}

export default toolbar
