import React from 'react'
import PropTypes, { bool } from 'prop-types'
import styles from './NavigationItem.module.css'

const navigationItem = props => (
    <li className={styles.NavigationItem}>
        <a
            href={props.link}
            className={props.active ? styles.active : null}>{props.children}</a>
    </li>
)

navigationItem.propTypes = {
    children: PropTypes.string,
    link: PropTypes.string,
    active: bool
}

export default navigationItem
