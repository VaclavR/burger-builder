import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class ErrorModal extends Component {
        state = {
            error: null
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({error: error})
            })
        }

        render() {
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
