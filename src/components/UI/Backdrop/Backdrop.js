import React from 'react'
import PropTypes from 'prop-types'
import styles from './Backdrop.module.css'

const backdrop = props => (
    props.show ? <div className={styles.Backdrop} onClick={props.clicked}></div> : null
)

backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func
}

export default backdrop
