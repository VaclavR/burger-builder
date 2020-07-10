import React, {Component} from 'react'
import styles from './ContactData.module.css'
import Button from '../../../UI/Button/Button'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form action=''>
                    <input className={styles.Input} type='text' name='name' placeholder='Your Name' />
                    <input className={styles.Input} type='email' name='email' placeholder='Your Mail' />
                    <input className={styles.Input} type='street' name='name' placeholder='Street' />
                    <input className={styles.Input} type='text' name='postal ' placeholder='Postal Code' />
                    <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData
