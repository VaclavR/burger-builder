import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './Auth.module.css'
import * as actions from '../../store/actions'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {
    const [controls, setControls] = useState({
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
            autocomplete: 'username',
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
            autocomplete: 'current-password',
            valid: false,
            touched: false
        }
    })
    const [isSignUp, setSignUp] = useState(true)

    const inputChangedHandler = (event, controlName) => {
        const value = event.target.value
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value,
                valid: checkValidity(value, controls[controlName].validation),
                touched: true
            })
        })
        setControls(updatedControls)
    }

    const submitHandler = event => {
        event.preventDefault()
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignUp ? 'signUp' : 'signInWithPassword')
    }

    const switchAuthModeHandler = () => {
        setSignUp(!isSignUp)
    }

    const { onSetAuthRedirectPath, isBuilding, authRedirectPath } = props

    useEffect(() => {
        if (isBuilding && authRedirectPath !== '/') {
            onSetAuthRedirectPath('/')
        }
    }, [onSetAuthRedirectPath, isBuilding, authRedirectPath])

    const formElementsArray = []
    for (const key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
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
            autocomplete={formElement.config.autocomplete}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))

    if (props.isLoading) {
        form = <Spinner />
    }

    let errorMessage = null

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }

    let authRedirect = null
    if (props.isAutheticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success' isDisabled={false}>SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Danger'>SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
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
