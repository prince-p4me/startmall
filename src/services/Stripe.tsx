import React, {useEffect, useMemo, useState} from "react";
import {IonButton, IonButtons, IonContent, IonIcon, IonPage, IonToolbar} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import {CardExpiryElement, CardNumberElement, CardCvcElement, useElements, useStripe, PaymentRequestButtonElement} from '@stripe/react-stripe-js';
import { ApplePay } from '@ionic-native/apple-pay';

const ELEMENT_OPTIONS = {
    style: {
        paymentRequestButton: {
            type: 'buy',
            theme: 'dark',
        },
    },
};

const StripeComponent = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null) as any;
    const [errorMessage, setErrorMessage] = useState(null);
    const [notAvailable, setNotAvailable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);

    useEffect(() => {
        if (!stripe) {
            // We can't create a PaymentRequest until Stripe.js loads.
            return;
        }

        const pr: any = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Demo total',
                amount: 100,
            },
        });

        pr.on('paymentmethod', async (event: any) => {
            setPaymentMethod(event.paymentMethod);
            event.complete('success');
        });

        pr.canMakePayment().then((canMakePaymentRes: any) => {
            console.log('canMakePaymentRes', canMakePaymentRes);
            if (canMakePaymentRes) {
                setPaymentRequest(pr);
            } else {
                setNotAvailable(true);
            }
        });
    }, [stripe]);

    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize: "16px",
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        []
    );

    const applePay = async () => {

        try {
            const applePayTransaction = await ApplePay.makePaymentRequest({
                  items: [
                    {
                        label: '3 x Basket Items',
                        amount: 49.99
                    },
                    {
                        label: 'Next Day Delivery',
                        amount: 3.99
                    },
                    {
                        label: 'My Fashion Company',
                        amount: 53.98
                    }
                ],
                shippingMethods: [
                    {
                        identifier: 'NextDay',
                        label: 'NextDay',
                        detail: 'Arrives tomorrow by 5pm.',
                        amount: 3.99
                    },
                    {
                        identifier: 'Standard',
                        label: 'Standard',
                        detail: 'Arrive by Friday.',
                        amount: 4.99
                    },
                    {
                        identifier: 'SaturdayDelivery',
                        label: 'Saturday',
                        detail: 'Arrive by 5pm this Saturday.',
                        amount: 6.99
                    }
                ],
                supportedNetworks: ['visa', 'masterCard', 'discover'],
                merchantCapabilities: ['3ds', 'debit', 'credit'],
                merchantIdentifier: 'merchant.com.startmall.app',
                currencyCode: 'USD',
                countryCode: 'US',
                billingAddressRequirement: 'none',
                shippingAddressRequirement: 'none',
                shippingType: 'shipping'
            });

            console.log(applePayTransaction);

        } catch(e) {
            // handle payment request error
            // Can also handle stop complete transaction but these should normally not occur
            console.log(e)
        }
    };

    const handleSubmit = async (event: any) => {

        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const element: any = elements.getElement(CardNumberElement);

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: element
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            alert(JSON.stringify(paymentMethod))
        }
    };

    return (
        // <Elements stripe={stripePromise}>
        <IonPage>
            <IonToolbar color="secondary">
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon
                            size="large"
                            slot="icon-only"
                            icon={closeOutline}
                        ></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>

                <form onSubmit={handleSubmit}>
                    <label>
                        Card number
                        <CardNumberElement options={options} />
                    </label>
                    <label>
                        Expiration date
                        <CardExpiryElement options={options} />
                    </label>
                    <label>
                        CVC
                        <CardCvcElement options={options} />
                    </label>
                    <IonButton type={'submit'} disabled={!stripe}>
                        Pay
                    </IonButton>

                    <br/>
                    <br/>
                    <IonButton onClick={applePay}>Apple Pay</IonButton>
                </form>

                {paymentRequest && (
                    <PaymentRequestButtonElement
                        onClick={(event) => {
                            if (paymentMethod) {
                                event.preventDefault();
                                console.log(
                                    'You can only use the PaymentRequest button once. Refresh the page to start over.'
                                );
                            }
                        }}
                        options={{
                            paymentRequest,
                        }}
                    />
                )}

            </IonContent>
        </IonPage>
        // </Elements>
    );
};

export default StripeComponent;
