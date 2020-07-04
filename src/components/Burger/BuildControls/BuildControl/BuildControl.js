import React from 'react'
import PropTypes from 'prop-types'
import styles from './BuildControl.module.css'

const buildControl = props => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button
                className={styles.Less}
                onClick={props.removed}
                disabled={props.isDisabled}>Less</button>
            <button className={styles.More} onClick={props.added}>More</button>
        </div>
    )
}

buildControl.propTypes = {
    label: PropTypes.string,
    added: PropTypes.func,
    removed: PropTypes.func,
    isDisabled: PropTypes.bool
}

export default buildControl
