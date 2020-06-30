import React from 'react'
import styles from './Modal.module.css'
import PropTypes from 'prop-types'

const modal = props => {
    return (
        <div
            className={styles.Modal}
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1': '0'
            }}>
            {props.children}
        </div>
    )
}

modal.propTypes = {
    children: PropTypes.any,
    show: PropTypes.bool
}

export default modal
