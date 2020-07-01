import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = props => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={styles.Modal}
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1': '0'
            }}>
            {props.children}
        </div>
    </React.Fragment>
)

modal.propTypes = {
    children: PropTypes.any,
    show: PropTypes.bool,
    modalClosed: PropTypes.func
}

export default modal
