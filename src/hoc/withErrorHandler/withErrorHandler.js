import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class ErrorModal extends Component {
        state = {
            initialized: false,
            error: null
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        componentDidMount() {
            this.requestInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.responseInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
            this.setState({initialized: true})
        }

        render() {
            if (!this.state.initialized) return null
            return (
                <React.Fragment>
                    <Modal
                        isVisible={this.state.error ? true : false}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler
