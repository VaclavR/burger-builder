import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../../../store/actions'
import styles from './ContactData.module.css'
import axios from '../../../../axios-orders'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input'
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity } from '../../../../shared/utility'

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            name: 'email',
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            valid: true
        }
    })
    const [isFormValid, setFormvalid] = useState(false)

    const orderHandler = event => {
        event.preventDefault()
        const formData = {}
        for (const formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const orderData = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            localId: props.localId
        }
        props.onOrderBurger(orderData, props.idToken)
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true

        for (const inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        setOrderForm(updatedOrderForm )
        setFormvalid(formIsValid)
    }

    const formElementsArray = []
    for (const key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    name={formElement.config.name}
                    isRequired={true}
                    isInvalid={!formElement.config.valid}
                    isTouched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType='Success' isDisabled={!isFormValid}>ORDER</Button>
        </form>
    )
    if (props.isLoading) {
        form = <Spinner />
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isLoading: state.order.isLoading,
        idToken: state.auth.idToken,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, idToken) => dispatch(actions.purchaseBurger(orderData, idToken))
    }
}

ContactData.propTypes = {
    history: PropTypes.object,
    ingredients: PropTypes.object,
    totalPrice: PropTypes.number,
    onOrderBurger: PropTypes.func,
    isLoading: PropTypes.bool,
    idToken: PropTypes.string,
    localId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
