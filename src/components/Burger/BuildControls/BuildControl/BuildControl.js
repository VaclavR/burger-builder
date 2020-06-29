import React from 'react'
import styles from './BuildControl.module.css'
import PropTypes from 'prop-types'

const buildControl = (props) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button className={styles.Less}>Less</button>
            <button className={styles.More}>More</button>
        </div>
    )
}

buildControl.propTypes = {
    label: PropTypes.string
}

export default buildControl
