import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.price,
            customer: {
                name: 'Jimmy',
                adress: {
                    street: 'Testsreet 1',
                    zipCode: '5000',
                    country: 'Argentina'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
        });
    }

    render () {
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="your Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="your Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
export default ContactData;