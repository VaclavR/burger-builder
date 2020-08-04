import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './Auth.module.css'
import * as actions from '../../store/actions'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import {updateObject, checkValidity} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: true,
        isSignUp: true
    }

    inputChangedHandler = (event, controlName) => {
        const value = event.target.value
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value,
                valid: checkValidity(value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp ? 'signUp' : 'signInWithPassword')
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    componentDidMount() {
        if (!this.props.isBuilding && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/')
        }
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                isInvalid={!formElement.config.valid}
                isTouched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))

        if (this.props.isLoading) {
            form = <Spinner />
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null
        if (this.props.isAutheticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success' isDisabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        isAutheticated: state.auth.idToken !== null,
        error: state.auth.error,
        isBuilding: state.burgerBuilder.isBuilding,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
}

Auth.propTypes = {
    onAuth: PropTypes.func,
    isLoading: PropTypes.bool,
    isAutheticated: PropTypes.bool,
    isBuilding: PropTypes.bool,
    error: PropTypes.object,
    authRedirectPath: PropTypes.string,
    onSetAuthRedirectPath: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
