import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

const button = props => (
    <button
        disabled={props.isDisabled}
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
)

button.propTypes = {
    children: PropTypes.string,
    clicked: PropTypes.func,
    btnType: PropTypes.string,
    isDisabled: PropTypes.bool
}

export default button
