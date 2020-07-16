import React from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.css'

const input = props => {
    let inputElement = null
    const inputClasses = [styles.InputElement]

    if (props.invalid && props.touched) {
        inputClasses.push(styles.Invalid)
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
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
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

input.propTypes = {
    elementConfig: PropTypes.object,
    label: PropTypes.string,
    value: PropTypes.string,
    elementType: PropTypes.string,
    changed: PropTypes.func
}

export default input
