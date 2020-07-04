import React from 'react'
import PropTypes from 'prop-types'
import styles from './Backdrop.module.css'

const backdrop = props => (
    props.isVisible ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
)

backdrop.propTypes = {
    isVisible: PropTypes.bool,
    clicked: PropTypes.func
}

export default backdrop
