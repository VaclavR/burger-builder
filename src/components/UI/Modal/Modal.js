import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.isVisible !== this.props.isVisible || nextProps.isVisible
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop isVisible={this.props.isVisible} clicked={this.props.modalClosed} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.isVisible ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.isVisible ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

Modal.propTypes = {
    children: PropTypes.any,
    isVisible: PropTypes.bool,
    modalClosed: PropTypes.func
}

export default Modal
