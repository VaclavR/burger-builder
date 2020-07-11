import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.css'

const input = props => {
    let inputElement = null

    switch(props.inputtype) {
        case 'input':
            inputElement = <input className={styles.InputElement} {...props} />
            break
        case 'textarea':
            inputElement = <textarea className={styles.InputElement} {...props} />
            break
        default:
            inputElement = <input className={styles.InputElement} {...props} />
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

input.propTypes = {
    inputtype: PropTypes.string,
    label: PropTypes.string
}

export default input
