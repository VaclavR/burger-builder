import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.css'

const input = props => {
    let inputElement = null
    const inputClasses = [styles.InputElement]

    if (props.isInvalid && props.isTouched) {
        inputClasses.push(styles.Invalid)
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                name={props.name}
                required={props.isRequired}
                onChange={props.changed}
                autoComplete={props.autocomplete} />
            break
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break
        default:
            console.log(props.elementType)
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />
    }

    let validationError = null
    if (props.isInvalid && props.isTouched) {
        validationError = <p className={styles.ValidationError}>Please enter a valid value!</p>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

input.propTypes = {
    elementConfig: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    elementType: PropTypes.string,
    autocomplete: PropTypes.string,
    changed: PropTypes.func,
    isTouched: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isRequired: PropTypes.bool
}

export default input
