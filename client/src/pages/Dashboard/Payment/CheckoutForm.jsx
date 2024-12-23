import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../../components/Hooks/useAuth';

const CheckoutForm = ({ price, selectedBook }) => {
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        console.log('Fetching clientSecret...');
        axios.post(`${import.meta.env.VITE_BASE_URL}/create-payment-intent`, { price })
            .then(res => {
                
                setClientSecret(res.data.clientSecret);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message)
            console.log(error)
        } else {
            console.log(paymentMethod)
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    },
                },
            }
        )

        if (confirmError) {
            setCardError(confirmError)
        }
        console.log(paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
                price,
                seats: 1,
                bookId: selectedBook.singleBook._id

            }
            axios.post(`${import.meta.env.VITE_BASE_URL}/payment`, payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertResult.acknowledged) {
                        Swal.fire({
                            icon: 'success',
                            text: 'Payment successfully',
                        })
                    }
                })
        }


    }
    return (
        <form onSubmit={handleSubmit} className='flex flex-col w-2/3 justify-center'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='my-3 text-red-800'>{cardError}</p>
            <button type="submit" disabled={!stripe || !clientSecret} className='mx-auto bg-[#FF1949] hover:bg-[#385777] text-white w-1/3 font-bold py-2 px-4 rounded-md'>Pay</button>
        </form>
    );
};

export default CheckoutForm;