import React from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes, {bool} from 'prop-types'
import styles from './NavigationItem.module.css'

const navigationItem = props => (
    <li className={styles.NavigationItem}>
        <NavLink
            exact={props.isExact}
            activeClassName={styles.active}
            to={props.link}>{props.children}</NavLink>
    </li>
)

navigationItem.propTypes = {
    children: PropTypes.string,
    link: PropTypes.string,
    isActive: bool,
    isExact: bool
}

export default navigationItem
