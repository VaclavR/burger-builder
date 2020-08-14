import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => (
    <React.Fragment>
        <Backdrop isVisible={props.isVisible} clicked={props.modalClosed} />
        <div
            className={styles.Modal}
            style={{
                transform: props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.isVisible ? '1' : '0'
            }}>
            {props.children}
        </div>
    </React.Fragment>
)


Modal.propTypes = {
    children: PropTypes.any,
    isVisible: PropTypes.bool,
    modalClosed: PropTypes.func
}

export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.isVisible === prevProps.isVisible &&
        nextProps.children === prevProps.children
)
