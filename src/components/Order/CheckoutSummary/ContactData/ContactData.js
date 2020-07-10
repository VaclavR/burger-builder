import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './ContactData.module.css'
import axios from '../../../../axios-orders'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})
        const orderData = {
            ingredient: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmuller',
                addres: {
                    street: 'Teststreet 1',
                    city: 'Berlin',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.json', orderData)
            .then(() => {
                this.setState({loading: false, purchasing: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
                console.warn(error)
            })
    }

    render() {
        let form = (
            <form action=''>
                <input className={styles.Input} type='text' name='name' placeholder='Your Name' />
                <input className={styles.Input} type='email' name='email' placeholder='Your Mail' />
                <input className={styles.Input} type='street' name='name' placeholder='Street' />
                <input className={styles.Input} type='text' name='postal ' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

ContactData.propTypes = {
    history: PropTypes.object,
    ingredients: PropTypes.object,
    price: PropTypes.number
}

export default ContactData
